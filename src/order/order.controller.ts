import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from "../auth/guards/bacis-auth.guard";
import { OrderService } from "./services/order.service";
import { OrderDto } from "./dto/order.dto";

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @UseGuards(BasicAuthGuard)
    @Get()
    async getAllOrders(): Promise<OrderDto[]> {
        return this.orderService.findAll();
    }

    @UseGuards(BasicAuthGuard)
    @Get(':orderId')
    async getOrder(@Param('orderId') orderId: string): Promise<OrderDto | null> {
        return this.orderService.findById(orderId);
    }

    @UseGuards(BasicAuthGuard)
    @Put(':orderId')
    async updateOrder(@Param('orderId') orderId: string, @Body() orderDto: OrderDto): Promise<OrderDto> {
        return this.orderService.update(orderId, orderDto);
    }

    @UseGuards(BasicAuthGuard)
    @Delete(':orderId')
    async removeOrder(@Param('orderId') orderId: string): Promise<void> {
        return this.orderService.remove(orderId);
    }
}