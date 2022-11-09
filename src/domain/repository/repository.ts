export default interface Repository<I, T> {
    find(id: I): Promise<T>;
    findAll(): Promise<T[]>
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
}