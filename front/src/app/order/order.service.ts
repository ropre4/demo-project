import {AxiosWrapper} from "../../utils/axios.wrapper";
import {omit} from "ramda";
import {IOrder} from "./order";

export class OrderService {

    static async create(order: IOrder, restaurantId: number): Promise<any> {
        const path = `/api/order/restaurant/${restaurantId}`;
        const response = await AxiosWrapper.post(path, omit(["id"], order));
        return response.data;
    }

    static async cancel(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}/cancel`;
        const response = await AxiosWrapper.put(path);
        return response.data;
    }

    static async process(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}/process`;
        const response = await AxiosWrapper.put(path);
        return response.data;
    }

    static async inRoute(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}/inroute`;
        const response = await AxiosWrapper.put(path);
        return response.data;
    }
    static async deliver(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}/deliver`;
        const response = await AxiosWrapper.put(path);
        return response.data;
    }
    static async receive(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}/receive`;
        const response = await AxiosWrapper.put(path);
        return response.data;
    }
    static async fetchByCustomerId(customerId: number): Promise<any> {
        const path = `/api/order/customer/${customerId}`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }

    static async fetchByOwnerId(ownerId: number): Promise<any> {
        const path = `/api/order/owner/${ownerId}`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }

    static async fetchByOrderId(orderId: number): Promise<any> {
        const path = `/api/order/${orderId}`;
        const response = await AxiosWrapper.get(path);
        return response.data;
    }
}