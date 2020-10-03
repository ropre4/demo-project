import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
export class UserBlock {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public userId!: number;
    @Column()
    public ownerId!: number;
}
