import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";
import { plainToInstance } from "class-transformer";
import { Cart as PrismaCart, CartItem as PrismaCartItem } from "@prisma/client";
import { ICartRepository } from "./cart.repository.interface";
import { CartDto, CartItemDto } from "../models";

@Injectable()
export class CartRepository implements ICartRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findByUserId(userId: string): Promise<CartDto | null> {
        const prismaCart = await this.prisma.cart.findUnique({
            where: {userId: userId},
            include: {items: true},
        });
        return prismaCart ? this.toDto(prismaCart) : null;
    }

    async createByUserId(userId: string): Promise<CartDto> {
        const prismaCart = await this.prisma.cart.create({
            data: {
                userId,
                items: {
                    create: [],
                },
            },
            include: {items: true},
        });
        return this.toDto(prismaCart);
    }

    async findOrCreateByUserId(userId: string): Promise<CartDto> {
        const userCart = await this.findByUserId(userId);
        if (userCart) {
            return userCart;
        }
        return this.createByUserId(userId);
    }

    async updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto> {
        const userCart = await this.findOrCreateByUserId(userId);
        const prismaCart = await this.prisma.cart.update({
            where: {id: userCart.id},
            data: {
                items: {
                    deleteMany: {},
                    create: items.map(item => this.toPrismaCartItem(item, userCart.id)),
                },
                updatedAt: new Date(),
            },
            include: {items: true},
        });
        return this.toDto(prismaCart);
    }

    async removeByUserId(userId: string): Promise<void> {
        await this.prisma.cart.deleteMany({
            where: {userId},
        });
    }

    private toDto(prismaCart: PrismaCart): CartDto {
        return plainToInstance(CartDto, {
            id: prismaCart.id,
            user_id: prismaCart.userId,
            created_at: prismaCart.createdAt.toISOString(),
            updated_at: prismaCart.updatedAt.toISOString(),
            status: prismaCart.status,
            // items: prismaCart.items.map(this.toDtoCartItem),
        });
    }

    private toDtoCartItem(prismaItem: PrismaCartItem): CartItemDto {
        return plainToInstance(CartItemDto, {
            productId: prismaItem.productId,
            count: prismaItem.count,
        });
    }

    private toPrismaCartItem(cartItem: CartItemDto, cartId: string): Omit<PrismaCartItem, 'id'> {
        return {
            cartId,
            productId: cartItem.productId,
            count: cartItem.count,
            orderId: null,
        };
    }
}