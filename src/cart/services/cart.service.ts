import { CartDto, CartItemDto } from "../models";
import { Injectable } from "@nestjs/common";
import { ICartRepository } from "../repositories";

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: ICartRepository) {
    }

    async findByUserId(userId: string): Promise<CartDto | null> {
        return this.cartRepository.findByUserId(userId);
    }

    async createByUserId(userId: string): Promise<CartDto> {
        return this.cartRepository.createByUserId(userId);
    }

    async findOrCreateByUserId(userId: string): Promise<CartDto> {
        return this.cartRepository.findOrCreateByUserId(userId);
    }

    async updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto> {
        return this.cartRepository.updateByUserId(userId, items);
    }

    async removeByUserId(userId: string): Promise<void> {
        return this.cartRepository.removeByUserId(userId);
    }
}