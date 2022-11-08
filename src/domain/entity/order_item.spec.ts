import OrderItem from "./order_item";

describe("Order Item unit tests", (): void => {

    it("should thrown error when price is invalid", (): void => {
        expect((): void => {
            new OrderItem("1", "1", "Item One", 0.00, 1);
        }).toThrowError("Price is required");
    });

    it("should thrown error when quantity is invalid", (): void => {
        expect((): void => {
            new OrderItem("1", "1", "Item One", 0.01, 0);
        }).toThrowError("Quantity is required");
    });

    it("should be evaluate total value of item", (): void => {
        const orderItem = new OrderItem("1", "1", "Item One", 1.00, 5);
        expect(orderItem.evaluateTotal()).toBe(5.00);
    });

});