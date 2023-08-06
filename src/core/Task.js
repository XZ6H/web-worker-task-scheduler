class Task {
    constructor(id, callback, trigger, options = {}) {
        this.id = id;
        this.callback = callback;
        this.trigger = trigger;
        this.options = options;
        this.lastRun = null;
        this.dependencies = options.dependencies || [];
        this.priority = options.priority || 0;
    }

    shouldRun() {
        if (this.trigger === 'interval') {
            const now = Date.now();
            return !this.lastRun || now - this.lastRun >= this.options.interval;
        }
        // Can add more trigger conditions as needed
        return false;
    }
}
