import Address from "../entity/address";
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order_service";

describe("Order service unit tests", (): void =>{

    it ("should place an order", (): void => {
        const address = new Address("Street bla", 1234, "12.345-678", "São Paulo");
        const customer = new Customer("1", "John Doe");
        customer.address = address;
        customer.activate();

        const item = new OrderItem("1", "1", "Item One", 10.00, 2);

        const order = OrderService.placeOrderWith(customer, [item]);

        expect(order.total()).toBe(20.00);
        expect(customer.rewardPoints).toBe(10);
    });

    it ("should thrown error when place order without items", (): void => {
        const address = new Address("Street bla", 1234, "12.345-678", "São Paulo");
        const customer = new Customer("1", "John Doe");
        customer.address = address;
        customer.activate();

        expect((): void => {
            OrderService.placeOrderWith(customer, []);
        }).toThrowError("Order should be least one item");
    });

    it ("should thrown error when customer is inactivated", (): void => {
        const customer = new Customer("1", "John Doe");
        const item = new OrderItem("1", "1", "Item One", 10.00, 2);

        expect((): void => {
            OrderService.placeOrderWith(customer, [item]);
        }).toThrowError("Order should be activated customer");
    });

    it("should get total value of all orders", (): void => {
        const itemOne = new OrderItem("1", "1", "Item One", 10.00, 2);
        const itemTwo = new OrderItem("2", "2", "Item Two", 15.00, 1);
        const itemThree = new OrderItem("3", "3", "Item Three", 100.00, 3);
        const itemFour = new OrderItem("1", "4", "Item Four", 1.00, 2);

        const orderOne = new Order("1", "1", [itemOne, itemTwo, itemThree]);
        const orderTwo = new Order("2", "1", [itemFour]);
        const orders: Order[] = [orderOne, orderTwo];

        const actual: number = OrderService.getTotalOrdersBy(orders);

        expect(actual).toBe(337.00);
    });

});