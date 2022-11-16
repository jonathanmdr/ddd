import Event from "../event";
import EventDispatcher from "../event_dispatcher";
import EventHandler from "../event_handler";

export default class EventDispatcherImpl implements EventDispatcher {

    private eventHandlers: { [eventName: string]: EventHandler[] } = {};

    public notify(event: Event): void {
        const eventName = event.eventData.name;

        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(handler => handler.handle(event));
        }
    }

    public register(eventName: string, eventHandler: EventHandler): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    public unregister(eventName: string, eventHandler: EventHandler): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);

            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    public unregisterAll(): void {
        this.eventHandlers = {};
    }

    public get getEventHandlers(): { [eventName: string]: EventHandler[] } {
        return this.eventHandlers;
    }

}