import { IsNumber, IsString } from "class-validator";

export class CartItemDto {
    @IsString()
    productId: string;

    @IsNumber()
    count: number;
}
