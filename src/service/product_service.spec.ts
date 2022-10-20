import Product from "../entity/product";
import ProductService from "./product_service";

describe("Product service unit tests", (): void =>{

    it("should change the prices of all products", (): void => {
        const productOne = new Product("1", "Product 1", 10.00);
        const productTwo = new Product("2", "Product 2", 20.00);
        const products: Product[] = [productOne, productTwo];

        ProductService.increasePrice(products, 100);

        expect(productOne.price).toBe(20.00);
        expect(productTwo.price).toBe(40.00);
    });

});