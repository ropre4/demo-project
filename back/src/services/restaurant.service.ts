import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { REPOSITORY_TYPE } from "../constants/repository.types";
import {Restaurant} from "../entities/restaurant";
import {omit} from "ramda";
import {RestaurantDTO} from "../dto/restaurantDTO";

export interface PaginatedResponse<T> {
    data: Array<T>,
    count: number
}
export const toPaginatedResponse = <T>(response: [Array<T>, number]):PaginatedResponse<T> => {
    return {data: response[0], count: response[1]};
};

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

    public async findByOwnerId(ownerId: number): Promise<PaginatedResponse<Restaurant>> {
        const response =  await this._restaurantRepository.findAndCount({
            ownerId: ownerId
        });
        return toPaginatedResponse(response);
    }
}
