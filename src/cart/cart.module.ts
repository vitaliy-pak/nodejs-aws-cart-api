import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "../order/order.module";
import { Cart } from "./entities/cart.entity";
import { CartItem } from "./entities/cart-item.entity";
import { CartService } from "./services/cart.service";
import { CartRepository } from "./repositories/cart.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, CartItem]),
        OrderModule,
    ],
    controllers: [CartController],
    providers: [CartRepository, CartService],
})
export class CartModule {
}
