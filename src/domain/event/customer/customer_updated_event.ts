import Event from "../../@shared/event/event";

export default class CustomerUpdatedEvent extends Event {

    constructor(eventData: any) {
        super(eventData);
    }

    public getEventName(): string {
        return "CUSTOMER_UPDATED_EVENT";
    }

}