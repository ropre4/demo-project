import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import {OrderStatus} from "../../../front/src/app/order/order";

@Entity()
export class OrderStatusHistory {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public orderId!: number;
    @Column()
    public userId!: number;
    @Column()
    public newStatus!: OrderStatus;
    @Column({ type: 'bigint' })
    public created!: number;
}