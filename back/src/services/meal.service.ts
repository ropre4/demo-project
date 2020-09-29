import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {omit} from "ramda";
import {Meal} from "../entities/meal";
import {MealDTO} from "../dto/mealDTO";
import {PaginatedResponse, toPaginatedResponse} from "./restaurant.service";
import {Restaurant} from "../entities/restaurant";

@injectable()
export class MealService {
    private readonly _mealRepository: Repository<Meal>;

    public constructor(
        @inject(REPOSITORY_TYPE.MealRepository)mealRepository: Repository<Meal>
    ) {
        this._mealRepository = mealRepository;
    }

    public async create(meal: MealDTO, ownerId: number, restaurantId: number): Promise<Meal> {
        return await this._mealRepository.save({
            ...meal,
            ownerId: ownerId,
            restaurantId: restaurantId
        });
    }

    public async edit(meal: MealDTO, userId: number, mealId: number): Promise<Meal> {

        const fromDB = await this.validateIsOwner(userId, mealId);

        return await this._mealRepository.save({
            ...fromDB,
            ...meal,
        });
    }

    public async delete(userId: number, mealId: number): Promise<Meal> {

        const fromDB = await this.validateIsOwner(userId, mealId);

        return await this._mealRepository.remove(fromDB);
    }

    public async findByRestaurantId(restaurantId: number): Promise<PaginatedResponse<Meal>> {
        const response =  await this._mealRepository.findAndCount({
            restaurantId: restaurantId
        });
        return toPaginatedResponse(response);
    }

    private async validateIsOwner(userId: number, mealId: number): Promise<Meal> {
        const fromDB: Meal = await this._mealRepository.findOneOrFail({id: mealId});
        if(fromDB.ownerId !== userId) throw new Error("Given user cannot modify the meal " + fromDB.id);
        return fromDB;
    }
}
