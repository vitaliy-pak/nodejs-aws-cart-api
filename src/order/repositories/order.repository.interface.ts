import { OrderDto } from "../models";

export interface IOrderRepository {
    findById(orderId: string): Promise<OrderDto | null>;

    create(data: OrderDto): Promise<OrderDto>;

    update(orderId: string, data: OrderDto): Promise<OrderDto>;

    remove(orderId: string): Promise<void>;
}