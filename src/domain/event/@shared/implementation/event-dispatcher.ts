import event from "../event";
import EventDispatcher from "../event_dispatcher";
import EventHandler from "../event_handler";

export default class EventDispatcherImpl implements EventDispatcher {

    private eventHandlers: { [eventName: string]: EventHandler[] } = {};

    public notify(event: event): void {
        throw new Error("Method not implemented.");
    }

    public register(eventName: string, handler: EventHandler): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    public unregister(eventName: string, handler: EventHandler): void {
        throw new Error("Method not implemented.");
    }

    public unregisterAll(): void {
        throw new Error("Method not implemented.");
    }

    public get getEventHandlers(): { [eventName: string]: EventHandler[] } {
        return this.eventHandlers;
    }

}