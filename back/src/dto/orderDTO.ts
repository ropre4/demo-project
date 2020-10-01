import {OrderStatus} from "../entities/order";

export interface OrderDTO {
    id?: number,
    created?: number,
    creatorId?: number,
    creatorName?: string,
    restaurantId?: number,
    restaurantName?: string,
    lastUpdate?: number,
    status?: OrderStatus,
    total: number
}

export interface OrderWithLinesDTO extends OrderDTO {
    lines: OrderLineDTO[];
}

export interface OrderWithDetailsDTO extends OrderWithLinesDTO {
    history: OrderStatusHistoryDTO[];
}

export interface OrderLineDTO {
    id?: number,
    orderId?: number,
    amount: number,
    price: number,
    mealId: number,
    mealName: string
}

export interface OrderStatusHistoryDTO {
    id: number,
    orderId: number,
    userId: number,
    newStatus: OrderStatus,
    created: number
}