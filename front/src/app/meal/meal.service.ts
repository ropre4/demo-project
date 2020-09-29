import {AxiosWrapper} from "../../utils/axios.wrapper";
import {omit} from "ramda";
import {IMealForm} from "./meal";



export class MealService {

    static async create(meal: IMealForm, restaurantId: number): Promise<any> {
        const path = `/api/restaurant/${restaurantId}/meal`;
        const response = await AxiosWrapper.post(path, omit(["id"], meal));
        return response.data;
    }

    static async edit(meal: IMealForm, restaurantId: number): Promise<any> {
        const path = `/api/restaurant/${restaurantId}/meal/${meal.id}`;
        const response = await AxiosWrapper.put(path, meal);
        return response.data;
    }

    static async delete(restaurantId:number, mealId: number): Promise<any> {
        const path = `/api/restaurant/${restaurantId}/meal/${mealId}`;
        const response = await AxiosWrapper.delete(path);
        return response.data;
    }

    static async fetchByRestaurantId(restaurantId: number): Promise<any> {
        const path = `/api/restaurant/${restaurantId}/meal`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }
}