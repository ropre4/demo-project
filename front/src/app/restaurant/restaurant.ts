import {isEmpty, isNil} from "ramda";

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

export interface IRestaurantForm {
    id?: number,
    name: string,
    description: string,
    cuisineType: CuisineType
}
export interface IRestaurantFormErrors {
    name: boolean,
    description: boolean,
    cuisineType: boolean
}

export interface IRestaurant {
    id: number,
    ownerId: number,
    name: string,
    description: string,
    cuisineType: CuisineType
}

export class RestaurantForm {

    static InitForm(restaurant?: IRestaurant): IRestaurantForm {
        return {
            id: restaurant ? restaurant.id : null,
            name: restaurant ? restaurant.name : "",
            description: restaurant ? restaurant.description : "",
            cuisineType: restaurant ? restaurant.cuisineType : null
        }
    }
    static InitErrors(): IRestaurantFormErrors {
        return {
            name: false,
            description: false,
            cuisineType: false
        }
    }
    static ValidateRestaurantForm(restaurant: IRestaurantForm): IRestaurantFormErrors {
        return {
            name: isEmpty(restaurant.name),
            description: isEmpty(restaurant.description),
            cuisineType: isNil(restaurant.cuisineType)
        }
    }
}