import { getConnection } from "typeorm";
import { Meal } from "../entities/meal";

export function getMealRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const mealRepository = conn.getRepository(Meal);
    return mealRepository;
}
