import Product from "../entity/product";
import Repository from "../../@shared/repository/repository";

export default interface ProductRepository extends Repository<string, Product> {}