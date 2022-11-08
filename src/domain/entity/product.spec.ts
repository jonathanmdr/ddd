import Product from "./product";

describe("product unit tests", (): void => {

    it("should thrown error when id is empty", (): void => {
        expect((): void => {
            new Product("", "My Product", 100.00);
        }).toThrowError("Id is required");
    });

    it("should thrown error when name is empty", (): void => {
        expect((): void => {
            new Product("1", "", 100.00);
        }).toThrowError("Name is required");
    });

    it("should thrown error when price is invalid", (): void => {
        expect((): void => {
            new Product("1", "My Product", -1.99);
        }).toThrowError("Price is required");
    });

    it("should thrown error when change name with invalid value", (): void => {
        expect((): void => {
            const product = new Product("1", "My Product", 1.99);
            product.changeName("");
        }).toThrowError("Name is required");
    });

    it("should be change name", (): void => {
        const product = new Product("1", "My Product", 1.99);
        product.changeName("Product name updated");

        expect(product.name).toBe("Product name updated");
    });

    it("should thrown error when change price with invalid value", (): void => {
        expect((): void => {
            const product = new Product("1", "My Product", 1.99);
            product.changePrice(-10.99);
        }).toThrowError("Price is required");
    });

    it("should be change price", (): void => {
        const product = new Product("1", "My Product", 1.99);
        product.changePrice(2.00);

        expect(product.price).toBe(2.00);
    });

});