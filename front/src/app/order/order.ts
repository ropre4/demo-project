import {IMeal} from "../meal/meal";
import {findIndex, propEq, update} from "ramda";

export enum OrderStatus {
    PLACED = 0,
    CANCELED = 1,
    PROCESSING = 2,
    IN_ROUTE = 3,
    DELIVERED = 4,
    RECEIVED = 5
}

export interface IOrder {
    id?: number,
    created?: number,
    creatorId?: number,
    creatorName?: string,
    restaurantId?: number,
    restaurantName?: string,
    lastUpdate?: number,
    status?: OrderStatus,
    total: number,
    lines: IOrderLine[]
    history?: IOrderStatusHistory[]
}

export interface IOrderLine {
    id?: number,
    orderId?: number,
    amount: number,
    price: number,
    mealId: number,
    mealName: string
}

export interface IOrderStatusHistory {
    id?: number,
    orderId?: number,
    newStatus: OrderStatus,
    created: number
}

export class Order {

    static InitOrder(): IOrder {
        return {
            total: 0,
            lines: []
        }
    }
    static AddLine(order: IOrder, meal: IMeal, amount: number): IOrder {
        if (amount < 0) throw new Error("Amount must be a positive number");

        const index = findIndex(propEq('mealId', meal.id))(order.lines);

        const updatedLines = (index === -1) ? order.lines.concat({
            orderId: order.id,
            amount: amount,
            price: meal.price,
            mealId: meal.id,
            mealName: meal.name
        }) : update(index, {...order.lines[index], amount: order.lines[index].amount + amount}, order.lines);

        return {
            ...order,
            lines: updatedLines,
            total: updatedLines.reduce((a, b)=>a+(b.amount*b.price),0)
        }
    }
}
