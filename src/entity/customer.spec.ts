import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should thrown error when id is empty", () => {
        expect(() => {
            new Customer("", "John Doe");
        }).toThrowError("Id is required");
    });

    it("should thrown error when name is empty", () => {
        expect(() => {
            new Customer("123", "");
        }).toThrowError("Name is required");
    });

});