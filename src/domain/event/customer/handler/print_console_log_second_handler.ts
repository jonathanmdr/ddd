import EventHandler from "../../@shared/event_handler";
import CustomerCreatedEvent from "../customer_created_event";

export default class PrintConsoleLogSecondHandler implements EventHandler<CustomerCreatedEvent> {

    public handle(event: CustomerCreatedEvent): void {
        console.log("This is second console.log of the event: %s", event.getEventName());
    }

}