import Customer from "../entity/customer";
import Repository from "../../@shared/repository/repository";

export default interface CustomerRepository extends Repository<string, Customer> {}