import Event from "./event";

export default interface EventHandler<T extends Event=Event> {

    handle(event: T): void;

}