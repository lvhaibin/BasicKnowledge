class EventEmit {
    constructor() {
        this.events = Object.create(null);
    }

    addEvent(event, fun) {
        if (this.events[event]) {
            this.events[event].push(fun);
        } else {
            this.events[event] = [fun];
        }
    }

    emit(event) {
        this.events[event].forEach(fn => fn());
    }
}

const eventEmit = new EventEmit();

eventEmit.addEvent('init', () => {
    console.log('init')
});

eventEmit.addEvent('init', () => {
    console.log('init1')
});

eventEmit.addEvent('init', () => {
    console.log('init2')
});

eventEmit.addEvent('mound', () => {
    console.log('mound')
});


eventEmit.emit('init');
eventEmit.emit('mound');