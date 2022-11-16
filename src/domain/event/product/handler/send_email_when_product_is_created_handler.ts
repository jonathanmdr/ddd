import EventHandler from "../../@shared/event_handler";
import ProductCreatedEvent from "../product_created_event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandler<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(`Sending e-mail to: ${event.eventData.email}`);
    }

}