import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie";
import { getDbConnection } from "./db";
import { REPOSITORY_TYPE } from "./constants/repository.types";
import {SERVICE_TYPE} from "./constants/service.types";
import {User} from "./entities/user";
import { getRepository } from "./repositories/movie_repository";
import {getUserRepository} from "./repositories/user.repository";
import {getRestaurantRepository} from "./repositories/restaurant.repository";
import {UserService} from "./services/user.service";
import {RestaurantService} from "./services/restaurant.service";
import {Restaurant} from "./entities/restaurant";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    //Controllers
    await require("./controllers/movie_controller");
    await require("./controllers/user.controller");
    await require("./controllers/restaurant.controller");
    //Services
    bind<UserService>(SERVICE_TYPE.UserService).to(UserService).inSingletonScope();
    bind<RestaurantService>(SERVICE_TYPE.RestaurantService).to(RestaurantService).inSingletonScope();
    //Repositories
    bind<Repository<Movie>>(REPOSITORY_TYPE.MovieRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();
    bind<Repository<User>>(REPOSITORY_TYPE.UserRepository).toDynamicValue(() => {
        return getUserRepository();
    }).inRequestScope();
    bind<Repository<Restaurant>>(REPOSITORY_TYPE.RestaurantRepository).toDynamicValue(() => {
        return getRestaurantRepository();
    }).inRequestScope();
});
