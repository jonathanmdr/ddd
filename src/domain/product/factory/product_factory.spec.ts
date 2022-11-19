import ProductFactory from "./product_factory";

describe("Product factory unit tests", (): void => {

    it("should be create product", (): void => {
        const product = ProductFactory.create("Product One", 10.00);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product One");
        expect(product.price).toBe(10.00);
    });

});