import {CuisineType} from "../entities/restaurant";

export interface RestaurantDTO {
    id?: number,
    name: string,
    description: string,
    cuisineType: CuisineType
}