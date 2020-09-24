import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class Director {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public name!: string;
}
