import { getConnection } from "typeorm";
import {UserBlock} from "../entities/userBlock";

export function getUserBlockRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const userBlockRepository = conn.getRepository(UserBlock);
    return userBlockRepository;
}
