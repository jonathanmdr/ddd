export default class Product {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this.validate(id, name, price);

        this._id = id;
        this._name = name;
        this._price = price;
    }

    public changeName(name: string): void {
        this.validate(this._id, name, this._price);

        this._name = name;
    }

    public changePrice(price: number): void {
        this.validate(this._id, this._name, price);

        this._price = price;
    }

    public get name(): string {
        return this._name;
    }

    public get price(): number {
        return this._price;
    }

    private validate(id: string, name: string, price: number): void {
        if (this.isInvalidString(id)) {
            throw new Error("Id is required");
        }
        if (this.isInvalidString(name)) {
            throw new Error("Name is required");
        }
        if (this.isInvalidPrice(price)) {
            throw new Error("Price is required");
        }
    }

    private isInvalidString(value: string): boolean {
        return typeof value === undefined
            || value === null
            || value.length === 0;
    }

    private isInvalidPrice(value: number): boolean {
        return typeof value === undefined
            || value === null
            || value <= 0;
    }

}