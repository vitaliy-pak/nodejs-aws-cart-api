import { CartDto, CartItem, CartItemDto } from '../../cart';
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

export type Order = {
    id?: string,
    userId: string;
    cartId: string;
    items: CartItem[]
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    comments: string,
    status: string;
    total: number;
}

export class PaymentDto {
    @IsString()
    type: string;

    @IsOptional()
    address?: any;

    @IsOptional()
    creditCard?: any;
}

export class DeliveryDto {
    @IsString()
    type: string;

    @IsObject()
    address: any;
}

export class OrderDto {
    @IsString()
    id?: string;

    @IsString()
    userId: string;

    @IsString()
    cartId: string;

    @IsArray()
    items: CartItemDto[];

    @IsObject()
    payment: PaymentDto;

    @IsObject()
    delivery: DeliveryDto;

    @IsOptional()
    @IsString()
    comments?: string;

    @IsString()
    status: string;

    @IsString()
    total: number;
}