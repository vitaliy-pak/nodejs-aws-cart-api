import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from "class-transformer";
import { Order, OrderStatus } from "../entities/order.entity";
import { OrderDto } from "../dto/order.dto";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {
    }

    async findAll(): Promise<OrderDto[]> {
        const orders = await this.orderRepository.find({relations: ['cart', 'cart.items'], withDeleted: true});
        return orders.map(order => plainToInstance(OrderDto, order));
    }

    async findById(orderId: string): Promise<OrderDto | null> {
        const order = await this.orderRepository.findOne({
            where: {id: orderId},
            relations: ['cart', 'cart.items'],
        });
        return order ? plainToInstance(OrderDto, order) : null;
    }

    async create(data: Partial<OrderDto>): Promise<OrderDto> {
        const order = this.orderRepository.create(plainToInstance(Order, {
            ...data,
            statusHistory: [
                {
                    status: OrderStatus.OPEN,
                    timestamp: new Date().toISOString(),
                    comment: 'Order has been created',
                },
            ],
        }));

        return plainToInstance(OrderDto, await this.orderRepository.save(order));
    }

    async update(orderId: string, data: Partial<OrderDto>): Promise<OrderDto> {
        await this.orderRepository.update(orderId, data);
        return this.findById(orderId);
    }

    async remove(orderId: string): Promise<void> {
        await this.orderRepository.delete(orderId);
    }
}