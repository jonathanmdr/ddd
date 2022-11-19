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

    it("should thrown error when items is empty", (): void => {
        expect((): void => {
            new Order("123", "123", []);
        }).toThrowError("OrderItem is required");
    });

    it("should add a new item into order", (): void => {
        const itemOne = new OrderItem("1", "1", "Item One", 100.00, 2);
        const itemTwo = new OrderItem("2", "2", "Item Two", 0.99, 1);

        const order = new Order("1", "1", [itemOne]);

        expect(order.items.length).toBe(1);
        expect(order.total()).toBe(200.00);

        order.addItem(itemTwo);

        expect(order.items.length).toBe(2);
        expect(order.total()).toBe(200.99);
    });

    it("should remove an item from order", (): void => {
        const itemOne = new OrderItem("1", "1", "Item One", 100.00, 2);
        const itemTwo = new OrderItem("2", "2", "Item Two", 0.99, 1);

        const order = new Order("1", "1", [itemOne, itemTwo]);

        expect(order.items.length).toBe(2);
        expect(order.items[0].id).toBe("1");
        expect(order.items[1].id).toBe("2");
        expect(order.total()).toBe(200.99);

        order.removeItem(itemOne);

        expect(order.items.length).toBe(1);
        expect(order.items[0].id).toBe("2");
        expect(order.total()).toBe(0.99);
    });

    it("should calculate total", (): void => {
        const itemOne = new OrderItem("1", "1", "Item One", 100.00, 2);
        const itemTwo = new OrderItem("2", "2", "Item Two", 0.99, 1);
        const order = new Order("1", "1", [itemOne, itemTwo]);

        expect(order.total()).toBe(200.99);
    });

});