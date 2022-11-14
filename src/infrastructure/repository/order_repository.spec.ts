import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerRepository from "../../domain/repository/customer_repository";
import OrderRepository from "../../domain/repository/order_repository";
import ProductRepository from "../../domain/repository/product_repository";
import CustomerModel from "../database/sequelize/model/customer";
import OrderModel from "../database/sequelize/model/order";
import OrderItemModel from "../database/sequelize/model/order_item";
import ProductModel from "../database/sequelize/model/product";
import CustomerRepositoryImpl from "./customer_repository";
import OrderRepositoryImpl from "./order_repository";
import ProductRepositoryImpl from "./product_repository";

describe("Order integration tests", (): void => {

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

        sequelize.addModels([CustomerModel, ProductModel, OrderItemModel, OrderModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create an order", async (): Promise<void> => {
        const address = new Address("Street One", 123, "90876000", "São Paulo");
        const customer = new Customer("123", "John Doe", address);
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        await customerRepository.create(customer);

        const product = new Product("123", "My Product", 10.00);
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        await productRepository.create(product);

        const orderItem = new OrderItem("123", product.id, product.name, product.price, 2);
        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository: OrderRepository = new OrderRepositoryImpl();
        await orderRepository.create(order);

        const actual = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: [
                "items"
            ]
        })

        expect(actual.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    productId: product.id,
                    orderId: order.id
                }
            ]
        });
    });

});