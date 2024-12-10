import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { plainToInstance } from "class-transformer";
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cart-item.entity";
import { CartDto, CartStatus } from "../dto/cart.dto";
import { CartItemDto } from "../dto/cart-item.dto";

@Injectable()
export class CartRepository {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    async findByUserId(userId: string): Promise<CartDto | null> {
        const cart = await this.findCartByUserId(userId);
        return cart ? plainToInstance(CartDto, cart): cart;
    }


    async createByUserId(userId: string): Promise<CartDto> {
        const cart = this.cartRepository.create({userId});
        return plainToInstance(Cart, await this.cartRepository.save(cart));
    }

    async findOrCreateByUserId(userId: string): Promise<CartDto> {
        const cart = await this.findCartByUserId(userId);

        if (cart) {
            return cart;
        }

        return this.createByUserId(userId);
    }

    async updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto> {
        await this.entityManager.transaction(async transactionalEntityManager => {
            const cart = await this.findCartByUserId(userId);

            if (!cart) {
                throw new EntityNotFoundError(Cart, `Cart for user with ID ${userId} is not found`);
            }

            await transactionalEntityManager.delete(CartItem, {cartId: cart.id});

            const updatedItems = items.map(itemDto => plainToInstance(CartItem, {
                ...itemDto,
                cartId: cart.id,
                cart: cart
            }));

            await transactionalEntityManager.save(updatedItems);
        });

        return await this.findByUserId(userId);
    }

    async removeByUserId(userId: string): Promise<CartDto> {
        const cart = await this.findCartByUserId(userId);

        if (!cart) {
            throw new EntityNotFoundError(Cart, `Cart for user with ID ${userId} is not found`);
        }

        await this.cartRepository.update({id: cart.id}, plainToInstance(Cart, {status: CartStatus.ORDERED}));
        const removedCart = await this.cartRepository.softRemove(cart);
        return plainToInstance(CartDto, removedCart);
    }

    private async findCartByUserId(userId: string): Promise<Cart | null> {
        const cart = await this.cartRepository.findOne({where: {userId}, relations: ['items']});
        return cart || null;
    }
}