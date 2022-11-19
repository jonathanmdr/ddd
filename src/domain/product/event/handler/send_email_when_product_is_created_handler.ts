import EventHandler from "../../../@shared/event/event_handler";
import ProductCreatedEvent from "../product_created_event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandler<ProductCreatedEvent> {

    public handle(event: ProductCreatedEvent): void {
        console.log("Sending e-mail with data: %s", JSON.stringify(event));
    }

}