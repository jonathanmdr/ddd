import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import Product from "../../domain/product/entity/product";
import CustomerRepository from "../../domain/customer/repository/customer_repository";
import OrderRepository from "../../domain/checkout/repository/order_repository";
import ProductRepository from "../../domain/product/repository/product_repository";
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

    it("Should update an order", async (): Promise<void> => {
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

        let actual = await OrderModel.findOne({
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

        const productNew = new Product("321", "My Product New", 10.00);
        await productRepository.create(productNew);

        const orderItemNew = new OrderItem("321", productNew.id, productNew.name, productNew.price, 2);
        order.addItem(orderItemNew);

        await orderRepository.update(order);

        actual = await OrderModel.findOne({
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
                },
                {
                    id: orderItemNew.id,
                    name: orderItemNew.name,
                    price: orderItemNew.price,
                    quantity: orderItemNew.quantity,
                    productId: productNew.id,
                    orderId: order.id
                }
            ]
        });
    });

    it("Should throw error when update a not found order", async (): Promise<void> => {
        const orderItem = new OrderItem("1", "1", "My product", 10.00, 2);
        const order = new Order("1", "1", [orderItem]);

        const orderRepository: OrderRepository = new OrderRepositoryImpl();

        expect(async () => {
            await orderRepository.update(order);
        }).rejects.toThrow("Order not found");
    });

    it("Should find an order", async (): Promise<void> => {
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
        });

        const expected = await orderRepository.find(order.id);

        expect(actual.toJSON()).toStrictEqual({
            id: expected.id,
            customerId: expected.customerId,
            total: expected.total(),
            items: [
                {
                    id: expected.items[0].id,
                    name: expected.items[0].name,
                    price: expected.items[0].price,
                    quantity: expected.items[0].quantity,
                    productId: expected.items[0].productId,
                    orderId: expected.id
                }
            ]
        });
    });

    it("Should throw error when find a not found order", async (): Promise<void> => {
        const orderRepository: OrderRepository = new OrderRepositoryImpl();

        expect(async () => {
            await orderRepository.find("NOT_FOUND");
        }).rejects.toThrow("Order not found");
    });

    it("Should find all orders", async (): Promise<void> => {
        const customerRepository: CustomerRepository = new CustomerRepositoryImpl();
        const productRepository: ProductRepository = new ProductRepositoryImpl();
        const orderRepository: OrderRepository = new OrderRepositoryImpl();

        const addressOne = new Address("Street One", 1, "90876000", "São Paulo");
        const customerOne = new Customer("1", "John Doe", addressOne);
        const productOne = new Product("1", "My Product One", 10.00);
        const orderItemOne = new OrderItem("1", productOne.id, productOne.name, productOne.price, 2);
        const orderOne = new Order("1", customerOne.id, [orderItemOne]);

        await customerRepository.create(customerOne);
        await productRepository.create(productOne);
        await orderRepository.create(orderOne);

        const addressTwo = new Address("Street Two", 2, "90876000", "São Paulo");
        const customerTwo = new Customer("2", "Jake Doe", addressTwo);
        const productTwo = new Product("2", "My Product Two", 10.00);
        const orderItemTwo = new OrderItem("2", productTwo.id, productTwo.name, productTwo.price, 2);
        const orderTwo = new Order("2", customerTwo.id, [orderItemTwo]);

        await customerRepository.create(customerTwo);
        await productRepository.create(productTwo);
        await orderRepository.create(orderTwo);

        const actual = await orderRepository.findAll();

        expect(actual.length).toBe(2);
        expect(actual).toContainEqual(orderOne);
        expect(actual).toContainEqual(orderTwo);
    });

});