import EventHandler from "../../../@shared/event/event_handler";
import CustomerCreatedEvent from "../customer_created_event";

export default class PrintConsoleLogFirstHandler implements EventHandler<CustomerCreatedEvent> {

    public handle(event: CustomerCreatedEvent): void {
        console.log("This is first console.log of the event: %s", event.getEventName());
    }

}