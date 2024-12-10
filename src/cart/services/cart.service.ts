import { Inject, Injectable } from "@nestjs/common";
import { CartRepository } from "../repositories/cart.repository";
import { CartDto } from "../dto/cart.dto";
import { CartItemDto } from "../dto/cart-item.dto";


@Injectable()
export class CartService {
    constructor(@Inject(CartRepository) private readonly cartRepository: CartRepository) {
    }

    async findByUserId(userId: string): Promise<CartDto | null> {
        return this.cartRepository.findByUserId(userId);
    }

    async findOrCreateByUserId(userId: string): Promise<CartDto> {
        return this.cartRepository.findOrCreateByUserId(userId);
    }

    async updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto> {
        return this.cartRepository.updateByUserId(userId, items);
    }

    async removeByUserId(userId: string): Promise<CartDto> {
        return this.cartRepository.removeByUserId(userId);
    }
}