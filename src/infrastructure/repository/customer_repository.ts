import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "../../domain/repository/customer_repository";
import CustomerModel from "../database/sequelize/model/customer";

export default class CustomerRepositoryImpl implements CustomerRepository {

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            });
        } catch(error) {
            throw new Error("Customer not found");
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city
        );
        return new Customer(
            customerModel.id,
            customerModel.name,
            address
        );
    }

    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll();
        return customersModel.map(customerModel => {
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zip,
                customerModel.city
            );
            return new Customer(
                customerModel.id,
                customerModel.name,
                address
            );
        });
    }

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

}