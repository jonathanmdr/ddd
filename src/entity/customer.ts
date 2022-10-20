import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this.validate(id, name);

        this._id = id;
        this._name = name;
    }

    private validate(id: string, name: string): void {
        if (this.isInvalidString(id)) {
            throw new Error("Id is required");
        }
        if (this.isInvalidString(name)) {
            throw new Error("Name is required");
        }
    }

    private isInvalidString(value: string): boolean {
        return typeof value === undefined
            || value === null
            || value.length === 0;
    }

    public changeName(name: string): void {
        this.validate(this._id, name);

        this._name = name;
    }

    public activate(): void {
        if (this._address === undefined || this._address === null) {
            throw new Error("Address is mandatory to activate customer");
        }
        this._active = true;
    }

    public deactivate(): void {
        this._active = false;
    }

    public isActive(): boolean {
        return this._active;
    }

    public set address(address: Address) {
        this._address = address;
    }

    public get name(): string {
        return this._name;
    }
    
}