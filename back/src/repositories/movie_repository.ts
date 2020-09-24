import { getConnection } from "typeorm";
import { Movie } from "../entities/movie";

export function getRepository() {
    const conn = getConnection(process.env.APP_ENV);
    const movieRepository = conn.getRepository(Movie);
    return movieRepository;
}
