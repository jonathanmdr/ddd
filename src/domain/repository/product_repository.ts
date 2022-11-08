import Product from "../entity/product";
import Repository from "./repository";

export default interface ProductRepository extends Repository<string, Product> {}