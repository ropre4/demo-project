import { getConnection } from "typeorm";
import {OrderLine} from "../entities/orderLine";

export function getOrderLineRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const orderLineRepository = conn.getRepository(OrderLine);
    return orderLineRepository;
}
