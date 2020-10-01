import {AxiosWrapper} from "../../utils/axios.wrapper";
import {omit} from "ramda";
import {IOrder} from "./order";

export class OrderService {

    static async create(order: IOrder, restaurantId: number): Promise<any> {
        const path = `/api/order/restaurant/${restaurantId}`;
        const response = await AxiosWrapper.post(path, omit(["id"], order));
        return response.data;
    }

    static async fetchByCustomerId(customerId: number): Promise<any> {
        const path = `/api/order/customer/${customerId}`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }
}