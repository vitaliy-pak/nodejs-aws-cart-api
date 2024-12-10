import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, UseGuards } from '@nestjs/common';

// import { BasicAuthGuard, JwtAuthGuard } from '../auth';


import { BasicAuthGuard } from "../auth/guards/bacis-auth.guard";
import { CartService } from "./services/cart.service";
import { OrderService } from "../order/services/order.service";
import { AppRequest, getUserIdFromRequest } from "../shared";

@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService,
        private orderService: OrderService
    ) {
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(BasicAuthGuard)
    @Get()
    async findUserCart(@Req() req: AppRequest) {
        const cart = await this.cartService.findOrCreateByUserId(getUserIdFromRequest(req));

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: {cart},
        }
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(BasicAuthGuard)
    @Put()
    async updateUserCart(@Req() req: AppRequest, @Body() body) {
        const cart = await this.cartService.updateByUserId(getUserIdFromRequest(req), body)

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: {
                cart,
            }
        }
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(BasicAuthGuard)
    @Delete()
    async clearUserCart(@Req() req: AppRequest) {
        await this.cartService.removeByUserId(getUserIdFromRequest(req));

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
        }
    }

    // @UseGuards(JwtAuthGuard)
    @UseGuards(BasicAuthGuard)
    @Post('checkout')
    async checkout(@Req() req: AppRequest, @Body() body) {
        console.log("body", body);
        const userId = getUserIdFromRequest(req);
        const cart = await this.cartService.findByUserId(userId);

        if (!(cart && cart.items.length)) {
            const statusCode = HttpStatus.BAD_REQUEST;
            req.statusCode = statusCode

            return {
                statusCode,
                message: 'Cart is empty',
            }
        }

        const {id: cartId} = cart;

        const order = await this.orderService.create({
            ...body,
            userId,
            cartId,
            cart
        });

        await this.cartService.removeByUserId(userId);

        return {
            statusCode: HttpStatus.OK,
            message: 'OK',
            data: {order}
        }
    }
}
