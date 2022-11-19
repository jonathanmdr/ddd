import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepository from "../../../../domain/checkout/repository/order_repository";
import OrderModel from "../model/order";
import OrderItemModel from "../model/order_item";

export default class OrderRepositoryImpl implements OrderRepository {

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne(
                {
                    where: {
                        id: id
                    },
                    include: [
                        "items"
                    ],
                    rejectOnEmpty: true
                }
            );
        } catch(error) {
            throw new Error("Order not found")
        }

        return this.toOrder(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({
            include: [
                "items"
            ]
        });
        return ordersModel.map(model => this.toOrder(model));
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customerId: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    productId: item.productId,
                    price: item.price,
                    quantity: item.quantity
                }))
            },
            {
                include: [
                    {
                        model: OrderItemModel
                    }
                ]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        try {
            await OrderModel.findOne(
                {
                    where: {
                        id: entity.id
                    },
                    rejectOnEmpty: true
                }
            );

            await OrderModel.sequelize.transaction(async (t) => {
                await OrderItemModel.destroy(
                    {
                        where: {
                            orderId: entity.id 
                        },
                        transaction: t,
                    }
                );

                const items = entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.productId,
                    quantity: item.quantity,
                    orderId: entity.id,
                }));

                await OrderItemModel.bulkCreate(
                    items,
                    {
                        transaction: t 
                    }
                );

                await OrderModel.update(
                    {
                        total: entity.total()
                    },
                    {
                        where: {
                            id: entity.id
                        },
                        transaction: t
                    }
                );
            });
        } catch(error) {
            throw new Error("Order not found");
        }
    }

    private toOrder(orderModel: OrderModel): Order {
        const items = orderModel.items.map(item => (
            new OrderItem(
                item.id,
                item.productId,
                item.name,
                item.price,
                item.quantity
            )
        ));

        return new Order(
            orderModel.id,
            orderModel.customerId,
            items
        );
    }

}