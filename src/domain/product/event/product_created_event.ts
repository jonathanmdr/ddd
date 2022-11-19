import Event from "../../event/@shared/event";

export default class ProductCreatedEvent extends Event {

    constructor(eventData: any) {
        super(eventData);
    }

    public getEventName(): string {
        return "PRODUCT_CREATED_EVENT";
    }

}