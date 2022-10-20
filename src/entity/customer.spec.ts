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
        const customer = new Customer("123", "John");
        const address = new Address("Street One", 123, "98.765-432", "São Paulo");
        customer.address = address;

        expect(customer.isActive()).toBe(false);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", (): void => {
        const customer = new Customer("123", "John");
        const address = new Address("Street One", 123, "98.765-432", "São Paulo");
        customer.address = address;

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

});