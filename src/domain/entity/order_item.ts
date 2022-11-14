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
    }

    public get id(): string {
        return this._id;
    }

    public get productId(): string {
        return this._productId;
    }

    public get name(): string {
        return this._name;
    }

    public get price(): number {
        return this._price;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public evaluateTotal(): number {
        return this._price * this._quantity;
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