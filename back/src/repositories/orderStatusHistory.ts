import { getConnection } from "typeorm";
import {OrderStatusHistory} from "../entities/orderStatusHistory";

export function getOrderStatusHistoryRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const orderStatusHistoryRepository = conn.getRepository(OrderStatusHistory);
    return orderStatusHistoryRepository;
}
