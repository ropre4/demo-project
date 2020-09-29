import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class Meal {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public restaurantId!: number;
    @Column()
    public ownerId!: number;
    @Column()
    public name!: string;
    @Column()
    public description!: string;
    @Column()
    public price!: number;
}
