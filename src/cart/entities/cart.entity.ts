import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./index";
import { CartStatus } from "../dto";



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

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];
}