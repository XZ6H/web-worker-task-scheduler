class WorkerWrapper {
  constructor(workerScript) {
      this.worker = new Worker(workerScript);
      this.listeners = {};
      this.queue = [];

      this.worker.onmessage = (e) => {
          const { taskId, event, data } = e.data;
          if (this.listeners[taskId] && this.listeners[taskId][event]) {
              this.listeners[taskId][event](data);
          }

          // On task completion, remove it from the queue
          this.queue = this.queue.filter(task => task.id !== taskId);

          // Try to process the next task
          this.processQueue();
      };
  }

  postTask(task, data) {
      this.queue.push({ task, data });
      this.processQueue();
  }

  processQueue() {
      if (!this.queue.length) return;

      // Sort tasks by priority
      this.queue.sort((a, b) => b.task.priority - a.task.priority);

      const nextTask = this.queue.find(task => {
          // Ensure no dependencies are in the queue
          return task.task.dependencies.every(dep => !this.queue.some(q => q.task.id === dep));
      });

      if (nextTask) {
          const { task, data } = nextTask;
          this.worker.postMessage({ task, data });
      }
  }

  on(taskId, event, callback) {
      if (!this.listeners[taskId]) this.listeners[taskId] = {};
      this.listeners[taskId][event] = callback;
  }
}
