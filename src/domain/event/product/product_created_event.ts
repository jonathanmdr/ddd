import Event from "../@shared/event";

export default class ProductCreatedEvent implements Event {

    dateTimeOccurred: Date;
    eventName: string;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventName = "PRODUCT_CREATED_EVENT";
        this.eventData = eventData;
    }

}