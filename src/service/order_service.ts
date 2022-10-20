import Order from "../entity/order";

export default class OrderService {

    public static getTotalOrdersBy(orders: Order[]): number {
        return orders.reduce((accumulator: number, order: Order): number => accumulator + order.total(), 0);
    }

}