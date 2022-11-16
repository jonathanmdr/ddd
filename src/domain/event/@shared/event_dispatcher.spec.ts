import SendEmailWhenProductIsCreatedHandler from "../product/handler/send_email_when_product_is_created_handler";
import ProductCreatedEvent from "../product/product_created_event";
import EventDispatcherImpl from "./implementation/event-dispatcher";

describe("Event dispatcher unit tests", (): void => {

    it("should register an event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"][0]).toEqual(eventHandler);
    });

    it("should unregister an event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"][0]).toEqual(eventHandler);

        eventDispatcher.unregister("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(0);
    });

    it("should unregister all event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"][0]).toEqual(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeUndefined();
    });

    it("should notify all event handlers", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("PRODUCT_CREATED_EVENT", eventHandler);

        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["PRODUCT_CREATED_EVENT"][0]).toEqual(eventHandler);

        const createdDate = new Date();
        const event = new ProductCreatedEvent({
            name: "PRODUCT_CREATED_EVENT",
            data: {
                id: 1,
                name: "One Product",
                description: "One Product Description",
                price: 10.00,
                createdAt: createdDate
            }
        });

        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });

});