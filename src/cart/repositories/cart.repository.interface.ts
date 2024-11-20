import { CartDto, CartItemDto } from "../models";

export interface ICartRepository {
    findByUserId(userId: string): Promise<CartDto | null>;

    createByUserId(userId: string): Promise<CartDto>;

    findOrCreateByUserId(userId: string): Promise<CartDto>;

    updateByUserId(userId: string, items: CartItemDto[]): Promise<CartDto>;

    removeByUserId(userId: string): Promise<void>;
}