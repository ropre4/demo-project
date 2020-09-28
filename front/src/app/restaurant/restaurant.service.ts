import {AxiosWrapper} from "../../utils/axios.wrapper";
import {omit} from "ramda";
import {IRestaurantForm} from "./restaurant";

export class RestaurantService {

    static async create(restaurant: IRestaurantForm): Promise<any> {
        const path = "/api/restaurant";
        const response = await AxiosWrapper.post(path, omit(["id"], restaurant));
        return response.data;
    }
    static async edit(restaurant: IRestaurantForm): Promise<any> {
        const path = `/api/restaurant/${restaurant.id}`;
        const response = await AxiosWrapper.put(path, restaurant);
        return response.data;
    }
    static async delete(restaurantId: number): Promise<any> {
        const path = `/api/restaurant/${restaurantId}`;
        const response = await AxiosWrapper.delete(path);
        return response.data;
    }
    static async fetchByOwnerId(userId: number): Promise<any> {
        const path = `/api/restaurant/owner/${userId}`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }
}