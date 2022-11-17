import EventHandler from "../../@shared/event_handler";
import CustomerUpdatedEvent from "../customer_updated_event";

export default class PrintConsoleLogWhenAddressIsChangedHandler implements EventHandler<CustomerUpdatedEvent> {

    public handle(event: CustomerUpdatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.toString()}`);
    }

}