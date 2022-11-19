import Event from "../../@shared/event/event";

export default class ProductCreatedEvent extends Event {

    constructor(eventData: any) {
        super(eventData);
    }

    public getEventName(): string {
        return "PRODUCT_CREATED_EVENT";
    }

}