import TaskScheduler from './core/TaskScheduler';

// This can be an example setup for the task scheduler, or even 
// a default setup if you expect the library to be used out of the box.
const scheduler = new TaskScheduler('./worker/workerScript.js');

// Example: Registering a task to run every 5 seconds
scheduler.registerTask(
    'intervalTask',
    function() {
        console.log("This task runs every 5 seconds.");
    },
    'interval',
    { interval: 5000 }
);

// Example: Registering an event-driven task
scheduler.registerTask(
    'eventTask',
    function() {
        console.log("This task runs when a specific event is triggered.");
    },
    'event',
    { eventName: 'customEvent' }
);

// Starting the scheduler
scheduler.start();

// Export the scheduler in case other modules or users of the library want direct access.
export default scheduler;
