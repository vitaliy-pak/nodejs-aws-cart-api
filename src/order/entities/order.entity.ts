import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Address, StatusHistory } from "../dto";

export enum OrderStatus {
    OPEN = 'OPEN',
    APPROVED = 'APPROVED',
    CONFIRMED = 'CONFIRMED',
    SENT = 'SENT',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_id', type: 'varchar', length: 255})
    userId: string;

    @Column({name: 'cart_id', type: 'varchar', length: 255})
    cartId: string;

    @Column({type: 'json'})
    address: Address;

    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN})
    status: string;

    // @OneToMany(() => CartItem, (cartItem) => cartItem.order, {onDelete: 'CASCADE'})
    // items: CartItem[];

    @Column({type: 'json', nullable: true})
    statusHistory: StatusHistory[];
}