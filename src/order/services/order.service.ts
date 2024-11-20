import { Injectable } from "@nestjs/common";
import { IOrderRepository } from "../repositories";
import { OrderDto } from "../models";


@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

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