let retryQueue = [];

self.onmessage = function(e) {
    const { task, data } = e.data;

    const func = new Function('return ' + task.callback)();

    try {
        const result = func(data);  // executing the task
        postMessage({
            taskId: task.id,
            event: 'completed',
            data: result
        });
    } catch (error) {
        const retries = task.options.retries || 3;
        const backoff = task.options.backoff || 5000; // 5 seconds by default

        const existingRetry = retryQueue.find(r => r.task.id === task.id);
        if (existingRetry) {
            if (existingRetry.attempts < retries) {
                existingRetry.attempts++;
                setTimeout(() => {
                    retryQueue = retryQueue.filter(r => r.task.id !== task.id);
                    self.postMessage({ task, data });
                }, backoff);
            } else {
                postMessage({
                    taskId: task.id,
                    event: 'error',
                    data: error.toString()
                });
            }
        } else {
            retryQueue.push({ task, data, attempts: 1 });
        }
    }
};
