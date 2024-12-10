import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";
import { CartStatus } from "../dto/cart.dto";
import { Order } from "../../order/entities/order.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'user_id', type: 'varchar', length: 255})
    userId: string;

    @Column({type: 'enum', enum: CartStatus, default: CartStatus.OPEN})
    status: CartStatus;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @OneToOne(() => Order, order => order.cart)
    order?: Order;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {onDelete: 'CASCADE'})
    items: CartItem[];
}