import Repository from "../../@shared/repository/repository";
import Order from "../entity/order";

export default interface OrderRepository extends Repository<string, Order> {}