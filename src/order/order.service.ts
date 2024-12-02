import { Injectable } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderService {
    // constructor(
    //     @InjectRepository(Order)
    //     private orderRepository: Repository<Order>,
    // ) {
    //     console.log("orderRepository", orderRepository);
    // }

    async findAll(): Promise<OrderDto[]> {
        // const orders = await this.orderRepository.find();
        // return orders.map(order => this.toDto(order));
        return new Promise<OrderDto[]>((res,rej) => res([]));
    }
    //
    // async findById(orderId: string): Promise<OrderDto | null> {
    //     const order = await this.orderRepository.findOne({
    //         where: {id: orderId},
    //         relations: ['items'],
    //     });
    //     return order ? this.toDto(order) : null;
    // }
    //
    // async create(data: OrderDto): Promise<OrderDto> {
    //     const order = this.orderRepository.create({
    //         ...data,
    //         statusHistory: [
    //             {
    //                 status: 'OPEN',
    //                 timestamp: new Date().toISOString(),
    //                 comment: 'Order has been created',
    //             },
    //         ],
    //     });
    //     return this.toDto(await this.orderRepository.save(order));
    // }
    //
    // async update(orderId: string, data: OrderDto): Promise<OrderDto> {
    //     await this.orderRepository.update(orderId, data);
    //     return this.findById(orderId);
    // }
    //
    // async remove(orderId: string): Promise<void> {
    //     await this.orderRepository.delete(orderId);
    // }
    //
    // private toDto(order: Order): OrderDto {
    //     return {
    //         id: order.id,
    //         userId: order.userId,
    //         cartId: order.cartId,
    //         // items: order.items.map(item => ({
    //         //     productId: item.productId,
    //         //     count: item.count,
    //         // })),
    //         address: order.address,
    //         statusHistory: order.statusHistory,
    //     };
    // }
}