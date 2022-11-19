import Customer from "../../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {

    public static placeOrderWith(customer: Customer, items: OrderItem[]): Order {
        OrderService.validatePlaceOrderRules(customer, items);

        const order = new Order(uuid(), customer.id, items);
        customer.increaseRewardPointsWith(order.total() / 2);

        return order;
    }

    public static getTotalOrdersBy(orders: Order[]): number {
        return orders.reduce((accumulator: number, order: Order): number => accumulator + order.total(), 0);
    }

    private static validatePlaceOrderRules(customer: Customer, items: OrderItem[]): void {
        if (items.length === 0) {
            throw new Error("Order should be least one item");
        }
        if (!customer.isActive()) {
            throw new Error("Order should be activated customer");
        }
    }

}