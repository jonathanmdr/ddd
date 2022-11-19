import EventDispatcherImpl from "../@shared/event/implementation/event-dispatcher";
import CustomerCreatedEvent from "../event/customer/customer_created_event";
import CustomerUpdatedEvent from "../event/customer/customer_updated_event";
import PrintConsoleLogFirstHandler from "../event/customer/handler/print_console_log_first_handler";
import PrintConsoleLogSecondHandler from "../event/customer/handler/print_console_log_second_handler";
import PrintConsoleLogWhenAddressIsChangedHandler from "../event/customer/handler/print_console_log_when_address_is_changed_handler";
import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", (): void => {

    it("should thrown error when id is empty", (): void => {
        expect((): void => {
            new Customer("", "John Doe");
        }).toThrowError("Id is required");
    });

    it("should thrown error when name is empty", (): void => {
        expect((): void => {
            new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should thrown error when change name to empty", (): void => {
        const customer = new Customer("123", "John");

        expect((): void => {
            customer.changeName("");
        }).toThrowError("Name is required");
        expect(customer.name).toBe("John");
    });

    it("should change name", (): void => {
        const customer = new Customer("123", "John");
        customer.changeName("John Doe");

        expect(customer.name).toBe("John Doe");
    });

    it("should thrown error when activate customer without address", (): void => {
        const customer = new Customer("123", "John");

        expect((): void => {
            customer.activate();
        }).toThrowError("Address is mandatory to activate customer");
        expect(customer.isActive()).toBe(false);
    });

    it("should activate customer", (): void => {
        const address = new Address("Street One", 123, "98.765-432", "São Paulo");
        const customer = new Customer("123", "John", address);

        expect(customer.isActive()).toBe(false);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", (): void => {
        const address = new Address("Street One", 123, "98.765-432", "São Paulo");
        const customer = new Customer("123", "John", address);

        expect(customer.isActive()).toBe(false);

        customer.activate();

        expect(customer.isActive()).toBe(true);

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", (): void => {
        const customer = new Customer("1", "John Doe");
        expect(customer.rewardPoints).toBe(0);

        customer.increaseRewardPointsWith(10);
        expect(customer.rewardPoints).toBe(10);

        customer.increaseRewardPointsWith(5);
        expect(customer.rewardPoints).toBe(15);
    });

    it("should change address", (): void => {
        const addressOne = new Address("Street One", 123, "98765432", "São Paulo");
        const customer = new Customer("1", "John Doe", addressOne);

        let expected = new Customer(customer.id, customer.name, customer.address);

        expect(customer).toStrictEqual(expected);

        const addressTwo = new Address("Street Two", 321, "90876123", "Rio de Janeiro");
        customer.changeAddress(addressTwo);

        expected = new Customer(customer.id, customer.name, addressTwo);

        expect(customer).toStrictEqual(expected);
    });

    it("should publish an event for customer created", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const consoleLogFisrtEventHandler = new PrintConsoleLogFirstHandler();
        const consoleLogSecondEventHandler = new PrintConsoleLogSecondHandler();
        const spyFirstHandler = jest.spyOn(consoleLogFisrtEventHandler, "handle");
        const spySecondHandler = jest.spyOn(consoleLogSecondEventHandler, "handle");
        const event = new CustomerCreatedEvent({});

        eventDispatcher.register(event.getEventName(), consoleLogFisrtEventHandler);
        eventDispatcher.register(event.getEventName(), consoleLogSecondEventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(2);
        expect(spyFirstHandler).toBeDefined();
        expect(spyFirstHandler).toBeCalledTimes(0);
        expect(spySecondHandler).toBeDefined();
        expect(spySecondHandler).toBeCalledTimes(0);

        const address = new Address("Street One", 123, "98765432", "São Paulo");
        new Customer("1", "John Doe", address, eventDispatcher);

        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(2);
        expect(spyFirstHandler).toBeDefined();
        expect(spyFirstHandler).toBeCalledTimes(1);
        expect(spySecondHandler).toBeDefined();
        expect(spySecondHandler).toBeCalledTimes(1);
    });

    it("should publish an event for customer change address", (): void => {
        const eventDispatcher = new EventDispatcherImpl();
        const eventHandler = new PrintConsoleLogWhenAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const event = new CustomerUpdatedEvent({});
        const addressOne = new Address("Street One", 123, "98765432", "São Paulo");
        const customer = new Customer("1", "John Doe", addressOne, eventDispatcher);

        eventDispatcher.register(event.getEventName(), eventHandler);

        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(spyEventHandler).toBeDefined();
        expect(spyEventHandler).toBeCalledTimes(0);

        const addressTwo = new Address("Street Two", 321, "90876123", "Rio de Janeiro");
        customer.changeAddress(addressTwo);

        expect(eventDispatcher.getEventHandlers[event.getEventName()].length).toBe(1);
        expect(spyEventHandler).toBeDefined();
        expect(spyEventHandler).toBeCalledTimes(1);
    });

});