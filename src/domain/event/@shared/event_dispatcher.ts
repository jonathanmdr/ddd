import Event from "./event";
import EventHandler from "./event_handler";

export default interface EventDispatcher {

    notify(event: Event): void;
    register(eventName: string, handler: EventHandler): void;
    unregister(eventName: string, handler: EventHandler): void;
    unregisterAll(): void;

}