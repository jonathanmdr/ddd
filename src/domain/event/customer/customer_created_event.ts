import Event from "../@shared/event";

export default class CustomerCreatedEvent extends Event {

    constructor(eventData: any) {
        super(eventData);
    }

    public getEventName(): string {
        return "CUSTOMER_CREATED_EVENT";
    }

}