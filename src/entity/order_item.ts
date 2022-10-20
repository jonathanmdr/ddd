export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this.validate(price, quantity);

        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;

        this.evaluateTotalPrice();
    }

    public get price(): number {
        return this._price;
    }

    private evaluateTotalPrice(): void {
        const total: number = this._price * this._quantity;
        this._price = total;
    }

    private validate(price: number, quantity: number): void {
        if (this.isLessThanOrEqualToZero(price)) {
            throw new Error("Price is required");
        }
        if (this.isLessThanOrEqualToZero(quantity)) {
            throw new Error("Quantity is required");
        }
    }

    private isLessThanOrEqualToZero(value: number): boolean {
        return typeof value === undefined
            || value === null
            || value <= 0;
    }

}