import Product from "../../domain/entity/product";
import ProductRepository from "../../domain/repository/product_repository";
import ProductModel from "../database/sequelize/model/product";

export default class ProductRepositoryImpl implements ProductRepository {

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id: id }});
        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }

    async findAll(): Promise<Product[]> {
        const productsModel = await ProductModel.findAll();
        return productsModel.map(productModel =>
            new Product(
                productModel.id,
                productModel.name,
                productModel.price
            )
        );
    }

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

}