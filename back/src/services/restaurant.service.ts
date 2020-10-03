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

    public async fetch(ownersToExclude: number[]): Promise<PaginatedResponse<Restaurant>> {
        const query = this._restaurantRepository.createQueryBuilder('r');
        if(ownersToExclude.length >0) query.where("r.ownerId NOT IN (" + ownersToExclude.join(",") + ")");
        const response =  await query.getManyAndCount();
        return toPaginatedResponse(response);
    }

    public async create(restaurant: RestaurantDTO, ownerId: number): Promise<Restaurant> {
        return await this._restaurantRepository.save({
            ...restaurant,
            ownerId: ownerId
        });
    }

    public async edit(restaurant: RestaurantDTO, userId: number, restaurantId: number): Promise<Restaurant> {

        const fromDB = await this.validateIsOwner(userId, restaurantId);

        return await this._restaurantRepository.save({...fromDB, ...restaurant});
    }

    public async delete(userId: number, restaurantId: number): Promise<Restaurant> {

        const fromDB = await this.validateIsOwner(userId, restaurantId);

        return await this._restaurantRepository.remove(fromDB);
    }

    public async findByOwnerId(ownerId: number): Promise<PaginatedResponse<Restaurant>> {
        const response =  await this._restaurantRepository.findAndCount({
            ownerId: ownerId
        });
        return toPaginatedResponse(response);
    }
    public async findById(restaurantId: number, ownersToExclude: number[]): Promise<Restaurant> {
        const query = this._restaurantRepository.createQueryBuilder('r')
            .where("r.id = " + restaurantId);
        if(ownersToExclude.length >0) query.where("r.ownerId NOT IN (" + ownersToExclude.join(",") + ")");
        return await query.getOne();
    }
    private async validateIsOwner(userId: number, restaurantId: number): Promise<Restaurant> {
        const fromDB: Restaurant = await this._restaurantRepository.findOneOrFail({id: restaurantId});
        if(fromDB.ownerId !== userId) throw new Error("Given user cannot modify the restaurant " + fromDB.id);
        return fromDB;
    }
}
