import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories';
import { CartDto, CartItemDto } from '../dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Cart, CartItem } from "../entities";
import { Repository } from "typeorm";

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
    ) {
        console.log("cartRepository", cartRepository);
        console.log("cartItemRepository", cartItemRepository);
    }

    async findByUserId(userId: string): Promise<CartDto | null> {
        const cart = await this.cartRepository.findOne({where: {userId}, relations: ['items']});
        return cart ? this.toDto(cart) : null;
    }

    async createByUserId(userId: string): Promise<CartDto> {
        const cart = this.cartRepository.create({userId});
        return this.toDto(await this.cartRepository.save(cart));
    }

    async findOrCreateByUserId(userId: string): Promise<CartDto> {
        const cart = await this.findByUserId(userId);
        if (cart) {
            return cart;
        }
        return this.createByUserId(userId);
    }

    async updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto> {
        const cart = await this.findOrCreateByUserId(userId);

        const updatedItems = items.map(item => ({
            productId: item.productId,
            count: item.count,
            cartId: cart.id,
        }));

        await this.cartItemRepository.delete({cartId: cart.id});
        await this.cartItemRepository.save(updatedItems);

        return cart;
    }

    async removeByUserId(userId: string): Promise<void> {
        const cart = await this.cartRepository.findOne({where: {userId}});
        if (cart) {
            await this.cartRepository.remove(cart);
        } else {
            throw new Error('Cart not found');
        }
    }

    private toDto(cart: Cart): CartDto {
        return {
            id: cart.id,
            user_id: cart.userId,
            created_at: cart.createdAt.toISOString(),
            updated_at: cart.updatedAt.toISOString(),
            status: cart.status,
            items: cart.items.map(this.toDtoCartItem),
        };
    }

    private toDtoCartItem(cartItem: CartItem): CartItemDto {
        return {
            productId: cartItem.productId,
            count: cartItem.count,
        };
    }
}