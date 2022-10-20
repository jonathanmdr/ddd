import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this.validate(id, customerId, items);

        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
    }

    private validate(id: string, customerId: string, items: OrderItem[]): void {
        if (this.isInvalidString(id)) {
            throw new Error("Id is required");
        }
        if (this.isInvalidString(customerId)) {
            throw new Error("CustomerId is required");
        }
        if (this.isInvalidArray(items)) {
            throw new Error("OrderItem is required");
        }
    }

    private isInvalidString(value: string): boolean {
        return typeof value === undefined
            || value === null
            || value.length === 0;
    }

    private isInvalidArray(value: any[]): boolean {
        return typeof value === undefined
            || value === null
            || value.length === 0;
    }

    public total(): number {
        return this._items.reduce((accumulator: number, item: OrderItem): number => accumulator + item.price, 0);
    }

}