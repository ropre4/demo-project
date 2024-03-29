import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

export enum OrderStatus {
    PLACED = 0,
    CANCELED = 1,
    PROCESSING = 2,
    IN_ROUTE = 3,
    DELIVERED = 4,
    RECEIVED = 5
}
export const IntialOrderStatus = OrderStatus.PLACED;

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column({ type: 'bigint' })
    public created!: number;
    @Column()
    public creatorId!: number;
    @Column()
    public creatorName!: string;
    @Column()
    public restaurantId!: number;
    @Column()
    public restaurantOwnerId!: number;
    @Column()
    public restaurantName!: string;
    @Column({ type: 'bigint' })
    public lastUpdate!: number;
    @Column()
    public status!: OrderStatus;
    @Column()
    public total!: number;

}