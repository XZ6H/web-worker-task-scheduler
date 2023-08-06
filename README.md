# Web Worker Task Scheduler

Web Worker Task Scheduler is a robust, efficient, and modular JavaScript task scheduler built on Web Workers. It ensures non-blocking operations and optimizes execution based on priority, dependencies, and other customizable conditions.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Common Use Cases](#common-use-cases)
- [Comparison with Other Task Schedulers](#comparison-with-other-task-schedulers)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Event-Driven Execution**: Schedule tasks based on custom events.
- **Time-Based Scheduling**: Execute tasks at regular intervals.
- **Priority Management**: Assign and execute tasks based on priority.
- **Error Handling with Retries**: Automatic retries with customizable backoff strategy.
- **Dependencies Management**: Define dependencies to execute tasks in sequence.
- **Reporting & Analytics**: Obtain detailed reports on task executions.

## Installation

```bash
npm install web-worker-task-scheduler
```

## Usage

### Initializing the scheduler

```javascript
import TaskScheduler from 'web-worker-task-scheduler';
const scheduler = new TaskScheduler('./path_to_worker/workerScript.js');
```

### Registering tasks

**Interval Task**:

```javascript
scheduler.registerTask(
    'intervalTask',
    function() {
        console.log("Runs every 5 seconds.");
    },
    'interval',
    { interval: 5000 }
);
```

**Event-Driven Task**:

```javascript
scheduler.registerTask(
    'eventTask',
    function() {
        console.log("Executes when a specific event is triggered.");
    },
    'event',
    { eventName: 'customEvent' }
);
```

### Starting the Scheduler

```javascript
scheduler.start();
```

## Common Use Cases

- **Background Data Processing**: Parse, transform, or analyze data without blocking the UI.
- **Regular Polling**: Poll an API or resource at regular intervals.
- **Deferred Actions**: Execute certain tasks only after a series of dependent tasks have completed.
- **Event-Based Operations**: React to specific events from your application or external sources.

**Pros**:
- **Non-blocking**: Utilizes Web Workers to ensure the main thread is never blocked.
- **Flexible**: Easily integrates with existing apps or platforms.
- **Extensible**: Designed to be modular, allowing for easy enhancements or extensions.

**Cons**:
- **Learning Curve**: Requires understanding of Web Workers.
- **Compatibility**: Web Workers are not available in all environments, like certain Node.js scenarios.


## License

MIT
