import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { CartItemDto } from "./cart-item.dto";
import { Expose, Transform } from "class-transformer";
export enum CartStatus {
    OPEN = "open",
    ORDERED = "ordered"
}

export class CartDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    userId: string;

    @Expose()
    @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
    @IsString()
    createdAt: Date;

    @Expose()
    @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
    @IsString()
    updatedAt: Date;

    @Expose()
    @Transform(({ value }) => value?.toISOString(), { toPlainOnly: true })
    @IsString()
    @IsOptional()
    deletedAt?: Date;

    @Expose()
    @IsEnum(CartStatus)
    status: CartStatus;

    @Expose()
    @IsArray()
    items: CartItemDto[];
}