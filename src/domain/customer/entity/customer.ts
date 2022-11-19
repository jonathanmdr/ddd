import Event from "../../@shared/event/event";
import EventDispatcher from "../../@shared/event/event_dispatcher";
import CustomerCreatedEvent from "../event/customer_created_event";
import CustomerUpdatedEvent from "../event/customer_updated_event";
import Address from "../value-object/address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    private eventDispatcher: EventDispatcher;

    constructor(id: string, name: string, address?: Address, eventDispatcher?: EventDispatcher) {
        this.validate(id, name);

        this._id = id;
        this._name = name;
        this._address = address;
        this.eventDispatcher = eventDispatcher;

        this.publishDomainEvent(new CustomerCreatedEvent(this));
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

    public increaseRewardPointsWith(points: number): void {
        this._rewardPoints += points;
    }

    public changeAddress(address: Address) {
        this._address = address;
        this.publishDomainEvent(new CustomerUpdatedEvent(this));
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get address(): Address {
        return this._address;
    }

    public get rewardPoints(): number {
        return this._rewardPoints;
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

    private publishDomainEvent(event: Event): void {
        if (this.eventDispatcher) {
            this.eventDispatcher.notify(event);
        }
    }
    
}