import { forwardRef, Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart, CartItem } from "./entities";
import { CartRepository } from "./repositories";


@Module({
    imports: [
        TypeOrmModule.forFeature([Cart, CartItem]),
            ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {
}
