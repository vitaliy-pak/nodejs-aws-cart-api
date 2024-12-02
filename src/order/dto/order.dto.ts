import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

export class Address {
    @IsOptional()
    comment?: string;

    @IsString()
    address: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}

export class StatusHistory {
    @IsString()
    status: string;

    @IsString()
    timestamp: string;

    @IsString()
    comment: string;
}

export class OrderDto {
    @IsString()
    id: string;

    @IsString()
    userId: string;

    @IsString()
    cartId: string;

    //
    // @IsArray()
    // items: CartItemDto[];

    @IsObject()
    address: Address;

    @IsOptional()
    @IsArray()
    statusHistory?: StatusHistory[]
}