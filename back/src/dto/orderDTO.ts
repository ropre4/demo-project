import {OrderStatus} from "../entities/order";

export interface OrderWithLinesDTO {
    id?: number,
    created?: number,
    creatorId?: number,
    creatorName?: string,
    restaurantId?: number,
    restaurantName?: string,
    lastUpdate?: number,
    status?: OrderStatus,
    total: number,
    lines: OrderLineDTO[]
}

export interface OrderLineDTO {
    id?: number,
    orderId?: number,
    amount: number,
    price: number,
    mealId: number,
    mealName: string
}