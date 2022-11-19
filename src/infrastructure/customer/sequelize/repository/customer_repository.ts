import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "../../../../domain/customer/repository/customer_repository";
import CustomerModel from "../model/customer";

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

        return this.toCustomer(customerModel);
    }

    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll();
        return customersModel.map(customerModel => this.toCustomer(customerModel));
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

    private toCustomer(customerModel: CustomerModel): Customer {
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city
        );
        const customer = new Customer(
            customerModel.id,
            customerModel.name,
            address
        );

        if (customerModel.active) {
            customer.activate();
        }

        customer.increaseRewardPointsWith(customerModel.rewardPoints);

        return customer;
    }

}