import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should thrown error when id is empty", () => {
        expect(() => {
            new Customer("", "John Doe");
        }).toThrowError("Id is required");
    });

});