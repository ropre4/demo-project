import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

export enum CuisineType {
    AMERICAN = 0,
    CHINESE = 1,
    JAPANESE = 2,
    KOREAN = 3,
    SPANISH = 4,
    ITALIAN = 5,
    FRENCH = 6,
    INDIAN = 7,
    OTHER = 8
}

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public ownerId!: number;
    @Column()
    public name!: string;
    @Column()
    public description!: string;
    @Column()
    public cuisineType!: CuisineType;

}
