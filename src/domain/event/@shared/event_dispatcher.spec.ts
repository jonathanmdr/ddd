import SendEmailWhenProductIsCreatedHandler from "../product/handler/send_email_when_product_is_created_handler";
import EventDispatcherImpl from "./implementation/event-dispatcher";

describe("Event dispatcher unit tests", (): void => {

    it("should register an event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(1);
    });

});