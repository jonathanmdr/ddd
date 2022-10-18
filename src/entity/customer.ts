import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    private validate(): void {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    public changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    public activate(): void {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate customer");
        }
        this._active = true;
    }

    public deactivate(): void {
        this._active = false;
    }

    set address(address: Address) {
        this._address = address;
    }
    
}