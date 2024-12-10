import { Inject, Injectable } from "@nestjs/common";
import { OrderDto } from "../dto/order.dto";
import { OrderRepository } from "../repositories/order.repository";


@Injectable()
export class OrderService {
    constructor(@Inject(OrderRepository) private readonly orderRepository: OrderRepository) {}

    async findAll(): Promise<OrderDto[]> {
        return this.orderRepository.findAll();
    }

    async findById(orderId: string): Promise<OrderDto | null> {
        return this.orderRepository.findById(orderId);
    }

    async create(data: OrderDto): Promise<OrderDto> {
        return this.orderRepository.create(data);
    }

    async update(orderId: string, data: OrderDto): Promise<OrderDto> {
        return this.orderRepository.update(orderId, data);
    }

    async remove(orderId: string): Promise<void> {
        return this.orderRepository.remove(orderId);
    }
}