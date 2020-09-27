import { getConnection } from "typeorm";
import {Restaurant} from "../entities/restaurant";

export function getRestaurantRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const restaurantRepository = conn.getRepository(Restaurant);
    return restaurantRepository;
}
