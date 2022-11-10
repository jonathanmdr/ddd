import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "../../domain/repository/customer_repository";
import CustomerModel from "../database/sequelize/model/customer";
import CustomerRepositoryImpl from "./customer_repository";

describe("Customer integration tests", (): void => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        const address = new Address("Foo Avenue", 1, "87987000", "São Paulo");
        const customer = new Customer("1", "John Doe", address);

        await customerRepository.create(customer);

        const actual = await CustomerModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "Foo Avenue",
            number: 1,
            zip: "87987000",
            city: "São Paulo",
            active: false,
            rewardPoints: 0
        });
    });

    it("Should update a customer", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        const address = new Address("Foo Avenue", 1, "87987000", "São Paulo");
        const customer = new Customer("1", "John Doe", address);

        await customerRepository.create(customer);

        let actual = await CustomerModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "Foo Avenue",
            number: 1,
            zip: "87987000",
            city: "São Paulo",
            active: false,
            rewardPoints: 0
        });

        customer.changeName("John Doe Updated")
        customer.activate();
        customer.increaseRewardPointsWith(10);

        await customerRepository.update(customer);

        actual = await CustomerModel.findOne({ where: { id: "1" }});

        expect(actual.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe Updated",
            street: "Foo Avenue",
            number: 1,
            zip: "87987000",
            city: "São Paulo",
            active: true,
            rewardPoints: 10
        });
    });

    it("Should find a customer", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        const address = new Address("Foo Avenue", 1, "87987000", "São Paulo");
        const customer = new Customer("1", "John Doe", address);

        await customerRepository.create(customer);

        let actual = await CustomerModel.findOne({ where: { id: "1" }});
        const expected = await customerRepository.find("1");

        expect(actual.toJSON()).toStrictEqual({
            id: expected.id,
            name: expected.name,
            street: expected.address.street,
            number: expected.address.number,
            zip: expected.address.zip,
            city: expected.address.city,
            active: expected.isActive(),
            rewardPoints: expected.rewardPoints
        });
    });

    it("Should thrown error when customer not found", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();

        expect(async () => {
            await customerRepository.find("NOT_FOUND");
        }).rejects.toThrow("Customer not found");
    });

    it("Should find all customers", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        const addressOne = new Address("Foo Avenue", 1, "87987000", "São Paulo");
        const customerOne = new Customer("1", "John Doe", addressOne);
        const addressTwo = new Address("Bla Avenue", 2, "80987001", "Curitiba");
        const customerTwo = new Customer("2", "Mark Doe", addressTwo);

        await customerRepository.create(customerOne);
        await customerRepository.create(customerTwo);

        const models = await CustomerModel.findAll();
        const actual = models.map(model => {
            const address = new Address(model.street, model.number, model.zip, model.city);
            return new Customer(model.id, model.name, address);
        });
        const expected = [customerOne, customerTwo];

        expect(actual).toEqual(expected);
    });

});