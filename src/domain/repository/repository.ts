export default interface Repository<I, T> {
    find(id: I): Promise<T>;
    findAll(id: I): Promise<T[]>
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
}