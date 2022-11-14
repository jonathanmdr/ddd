import Order from "../entity/order";
import Repository from "./repository";

export default interface OrderRepository extends Repository<string, Order> {}