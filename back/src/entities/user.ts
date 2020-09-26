import {
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

export enum UserRole {
    CUSTOMER = 0,
    RESTAURANT_OWNER = 1
}

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public name!: string;
    @Column()
    public surname!: string;
    @Column()
    public email!: string;
    @Column()
    public role!: UserRole;
    @Column()
    public password!: string;
}
