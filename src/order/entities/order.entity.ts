import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../../cart/entities/cart.entity";
import { Address, StatusHistory } from "../dto/order.dto";

export enum OrderStatus {
    OPEN = 'open',
    APPROVED = 'approved',
    CONFIRMED = 'confirmed',
    SENT = 'sent',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_id', type: 'varchar', length: 255})
    userId: string;

    @Column({name: 'cart_id', type: 'varchar', length: 255})
    cartId: string;

    @OneToOne(() => Cart, cart => cart.order)
    @JoinColumn()
    cart: Cart;

    @Column({type: 'json'})
    address: Address;

    @Column({type: 'json', nullable: true})
    statusHistory: StatusHistory[];
}