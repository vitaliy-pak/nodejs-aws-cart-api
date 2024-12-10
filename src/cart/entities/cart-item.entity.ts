import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({name: 'cart_id', type: 'varchar', length: 255})
    cartId: string;

    @Column({name: 'product_id', type: 'varchar', length: 255})
    productId: string;

    @Column({type: 'int'})
    count: number;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;
}