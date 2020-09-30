import { getConnection } from "typeorm";
import {Order} from "../entities/order";

export function getOrderRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const orderRepository = conn.getRepository(Order);
    return orderRepository;
}
