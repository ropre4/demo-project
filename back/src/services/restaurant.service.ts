import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {Restaurant} from "../entities/restaurant";
import {omit} from "ramda";
import {RestaurantDTO} from "../dto/restaurantDTO";

@injectable()
export class RestaurantService {
    private readonly _restaurantRepository: Repository<Restaurant>;

    public constructor(
        @inject(REPOSITORY_TYPE.RestaurantRepository)restaurantRepository: Repository<Restaurant>
    ) {
        this._restaurantRepository = restaurantRepository;
    }

    public async create(restaurant: RestaurantDTO, ownerId: number): Promise<Restaurant> {
        return await this._restaurantRepository.save({
            ...restaurant,
            ownerId: ownerId
        });
    }

}
