import { Injectable } from '@nestjs/common';
import { Order as PrismaOrder } from '@prisma/client';
import { plainToInstance } from "class-transformer";
import { IOrderRepository } from "./order.repository.interface";
import { PrismaService } from "../../prisma";
import { OrderDto } from "../models";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findById(orderId: string): Promise<OrderDto | null> {
        const prismaOrder = await this.prisma.order.findUnique({
            where: {id: orderId},
            include: {items: true},
        });
        return prismaOrder ? this.toDto(prismaOrder) : null;
    }

    async create(data: OrderDto): Promise<OrderDto> {
        const prismaOrder = await this.prisma.order.create({
            data: {
                userId: data.userId,
                cartId: data.cartId,
                paymentType: data.payment.type,
                paymentAddress: data.payment.address,
                creditCard: data.payment.creditCard,
                deliveryType: data.delivery.type,
                deliveryAddress: data.delivery.address,
                comments: data.comments,
                status: data.status,
                total: data.total,
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        count: item.count,
                    })),
                },
            },
            include: {items: true},
        });
        return this.toDto(prismaOrder);
    }

    async update(orderId: string, data: OrderDto): Promise<OrderDto> {
        const prismaOrder = await this.prisma.order.update({
            where: {id: orderId},
            data: {
                userId: data.userId,
                cartId: data.cartId,
                paymentType: data.payment.type,
                paymentAddress: data.payment.address,
                creditCard: data.payment.creditCard,
                deliveryType: data.delivery.type,
                deliveryAddress: data.delivery.address,
                comments: data.comments,
                status: data.status,
                total: data.total,
                items: {
                    deleteMany: {},
                    create: data.items.map(item => ({
                        productId: item.productId,
                        count: item.count,
                    })),
                },
            },
            include: {items: true},
        });
        return this.toDto(prismaOrder);
    }

    async remove(orderId: string): Promise<void> {
        await this.prisma.order.delete({
            where: {id: orderId},
        });
    }

    private toDto(prismaOrder: PrismaOrder): OrderDto {
        return plainToInstance(OrderDto, {
            id: prismaOrder.id,
            userId: prismaOrder.userId,
            cartId: prismaOrder.cartId,
            // items: prismaOrder.items.map(item => ({
            //     productId: item.productId,
            //     count: item.count,
            // })),
            payment: {
                type: prismaOrder.paymentType,
                address: prismaOrder.paymentAddress,
                creditCard: prismaOrder.creditCard,
            },
            delivery: {
                type: prismaOrder.deliveryType,
                address: prismaOrder.deliveryAddress,
            },
            comments: prismaOrder.comments,
            status: prismaOrder.status,
            total: prismaOrder.total,
        });
    }
}