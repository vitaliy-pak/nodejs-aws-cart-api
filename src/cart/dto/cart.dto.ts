import { IsArray, IsString } from "class-validator";
import { CartItemDto } from "./index";
export enum CartStatus {
    OPEN = "OPEN",
    ORDERED = "ORDERED"
}

export class CartDto {
    @IsString()
    id: string;

    @IsString()
    user_id: string;

    @IsString()
    created_at: string;

    @IsString()
    updated_at: string;

    @IsString()
    status: string;

    @IsArray()
    items: CartItemDto[];
}