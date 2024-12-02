import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
        console.log('OrderController: orderService', orderService);
    }

    @Get()
    async getAllOrders(): Promise<OrderDto[]> {
        return this.orderService.findAll();
    }

    // @Get(':orderId')
    // async getOrder(@Param('orderId') orderId: string): Promise<OrderDto | null> {
    //     return this.orderService.findById(orderId);
    // }
    //
    // @Post()
    // async createOrder(@Body() orderDto: OrderDto): Promise<OrderDto> {
    //     return this.orderService.create(orderDto);
    // }
    //
    // @Put(':orderId')
    // async updateOrder(@Param('orderId') orderId: string, @Body() orderDto: OrderDto): Promise<OrderDto> {
    //     return this.orderService.update(orderId, orderDto);
    // }
    //
    // @Delete(':orderId')
    // async removeOrder(@Param('orderId') orderId: string): Promise<void> {
    //     return this.orderService.remove(orderId);
    // }
}