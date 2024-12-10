import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderService } from "./services/order.service";
import { Order } from "./entities/order.entity";
import { OrderRepository } from "./repositories/order.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
    ],
    controllers: [OrderController],
    providers: [OrderRepository, OrderService],
    exports: [OrderService],
})
export class OrderModule {
}
