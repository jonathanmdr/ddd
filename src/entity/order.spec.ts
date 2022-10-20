import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", (): void => {

    it("should thrown error when id is empty", (): void => {
        expect((): void => {
            new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should thrown error when customerId is empty", (): void => {
        expect((): void => {
            new Order("123", "", []);
        }).toThrowError("Id is required");
    });

    it("should thrown error when customerId is empty", (): void => {
        expect((): void => {
            new Order("123", "123", []);
        }).toThrowError("OrderItem is required");
    });

    it("should calculate total", (): void => {
        const itemOne = new OrderItem("1", "Item One", 100.00);
        const itemTwo = new OrderItem("2", "Item Two", 0.99);
        const order = new Order("1", "1", [itemOne, itemTwo]);

        expect(order.total()).toBe(100.99);
    });

});