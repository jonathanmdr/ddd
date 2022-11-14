import Order from "../../domain/entity/order";
import OrderRepository from "../../domain/repository/order_repository";
import OrderModel from "../database/sequelize/model/order";
import OrderItemModel from "../database/sequelize/model/order_item";

export default class OrderRepositoryImpl implements OrderRepository {

    async find(id: string): Promise<Order> {
        throw new Error("Uninplemented");
    }

    async findAll(): Promise<Order[]> {
        throw new Error("Uninplemented");
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customerId: entity.id,
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
        throw new Error("Uninplemented");
    }

}