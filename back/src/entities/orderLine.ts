import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class OrderLine {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public orderId!: number;
    @Column()
    public amount!: number;
    @Column()
    public price!: number;
    @Column()
    public mealId!: number;
    @Column()
    public mealName!: string;
}