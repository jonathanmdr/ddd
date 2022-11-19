import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../domain/product/repository/product_repository";
import ProductModel from "../model/product";
import ProductRepositoryImpl from "./product_repository";

describe("Product integration tests", (): void => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async (): Promise<void> => {
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        const product = new Product("1", "Product One", 100.00);

        await productRepository.create(product);

        const actual = await ProductModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "Product One",
            price: 100.00
        });
    });

    it("Should update a product", async (): Promise<void> => {
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        const product = new Product("1", "Product One", 100.00);

        await productRepository.create(product);

        let actual = await ProductModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "Product One",
            price: 100.00
        });

        product.changeName("Product One Updated");
        product.changePrice(100.99);

        await productRepository.update(product);

        actual = await ProductModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "Product One Updated",
            price: 100.99
        });
    });

    it("Should find a product", async (): Promise<void> => {
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        const product = new Product("1", "Product One", 100.00);

        await productRepository.create(product);

        const actual = await ProductModel.findOne({ where: { id: "1" }});
        const expected = await productRepository.find("1");

        expect(actual.toJSON()).toStrictEqual({
            id: expected.id,
            name: expected.name,
            price: expected.price
        });
    });

    it("Should find all products", async (): Promise<void> => {
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        const productOne = new Product("1", "Product One", 100.00);
        const productTwo = new Product("2", "Product Two", 100.00);

        await productRepository.create(productOne);
        await productRepository.create(productTwo);

        const actual = await productRepository.findAll();
        const expected = [productOne, productTwo];

        expect(actual).toEqual(expected);
    });

});