import SendEmailWhenProductIsCreatedHandler from "../product/handler/send_email_when_product_is_created_handler";
import ProductCreatedEvent from "../product/product_created_event";
import EventDispatcherImpl from "./implementation/event-dispatcher";

describe("Event dispatcher unit tests", (): void => {

    it("should register an event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const event = new ProductCreatedEvent({});

        eventDispatcher.register(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[event.getEventName()][0]).toEqual(eventHandler);
    });

    it("should unregister an event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const event = new ProductCreatedEvent({});

        eventDispatcher.register(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[event.getEventName()][0]).toEqual(eventHandler);

        eventDispatcher.unregister(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(0);
    });

    it("should unregister all event handler", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const event = new ProductCreatedEvent({});

        eventDispatcher.register(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[event.getEventName()][0]).toEqual(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeUndefined();
    });

    it("should notify all event handlers", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        const event = new ProductCreatedEvent(
            {
                data: {
                    id: 1,
                    name: "One Product",
                    description: "One Product Description",
                    price: 10.00,
                    createdAt: new Date()
                }
            }
        );

        eventDispatcher.register(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[event.getEventName()][0]).toEqual(eventHandler);

        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });

});