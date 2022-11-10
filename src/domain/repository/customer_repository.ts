import Customer from "../entity/customer";
import Repository from "./repository";

export default interface CustomerRepository extends Repository<string, Customer> {}