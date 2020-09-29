import {isEmpty, isNil} from "ramda";

export interface IMealForm {
    id?: number,
    name: string,
    description: string,
    price: number
}
export interface IMealFormErrors {
    name: boolean,
    description: boolean,
    price: boolean
}

export interface IMeal{
    id: number,
    restaurantId: number,
    ownerId: number,
    name: string,
    description: string,
    price: number
}

export class MealForm {

    static InitForm(meal?: IMeal): IMealForm {
        return {
            id: meal ? meal.id : null,
            name: meal ? meal.name : "",
            description: meal ? meal.description : "",
            price: meal ? meal.price : null
        }
    }
    static InitErrors(): IMealFormErrors {
        return {
            name: false,
            description: false,
            price: false
        }
    }
    static ValidateMealForm(meal: IMealForm): IMealFormErrors{
        return {
            name: isEmpty(meal.name),
            description: isEmpty(meal.description),
            price: isNil(meal.price) || meal.price <=0
        }
    }
}