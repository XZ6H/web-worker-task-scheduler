class TaskScheduler {
  constructor(workerScript) {
      this.tasks = {};
      this.workerWrapper = new WorkerWrapper(workerScript);
      this.reports = {};
  }

  registerTask(id, callback, trigger, options) {
      const task = new Task(id, callback, trigger, options);
      this.tasks[id] = task;

      // Listen for task completion
      this.workerWrapper.on(id, 'completed', (data) => {
          this.reports[id] = {
              success: true,
              lastRun: Date.now(),
              result: data
          };
      });
  }

  triggerEvent(eventId) {
      for (const taskId in this.tasks) {
          const task = this.tasks[taskId];
          if (task.trigger === 'event' && task.options.eventName === eventId) {
              this.workerWrapper.postTask(task, null);  // No data in this example
          }
      }
  }

  getReport(taskId) {
      return this.reports[taskId] || {};
  }

  start() {
      setInterval(() => {
          for (const taskId in this.tasks) {
              const task = this.tasks[taskId];
              if (task.shouldRun()) {
                  task.lastRun = Date.now();
                  this.workerWrapper.postTask(task, null);  // No data in this example
              }
          }
      }, 1000);
  }
}
