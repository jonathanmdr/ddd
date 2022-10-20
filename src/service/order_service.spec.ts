import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order_service";

describe("Order service unit tests", (): void =>{

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