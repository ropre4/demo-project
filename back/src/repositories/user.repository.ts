import { getConnection } from "typeorm";
import { User } from "../entities/user";

export function getUserRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const userRepository = conn.getRepository(User);
    return userRepository;
}
