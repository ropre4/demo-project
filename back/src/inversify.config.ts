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
import {getMealRepository} from "./repositories/meal.repository";
import {UserService} from "./services/user.service";
import {RestaurantService} from "./services/restaurant.service";
import {MealService} from "./services/meal.service";
import {Restaurant} from "./entities/restaurant";
import {Meal} from "./entities/meal";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    //Controllers
    await require("./controllers/movie_controller");
    await require("./controllers/user.controller");
    await require("./controllers/restaurant.controller");
    await require("./controllers/meal.controller");
    //Services
    bind<UserService>(SERVICE_TYPE.UserService).to(UserService).inSingletonScope();
    bind<RestaurantService>(SERVICE_TYPE.RestaurantService).to(RestaurantService).inSingletonScope();
    bind<MealService>(SERVICE_TYPE.MealService).to(MealService).inSingletonScope();
    //Repositories
    bind<Repository<Movie>>(REPOSITORY_TYPE.MovieRepository).toDynamicValue(getRepository).inRequestScope();
    bind<Repository<User>>(REPOSITORY_TYPE.UserRepository).toDynamicValue(getUserRepository).inRequestScope();
    bind<Repository<Restaurant>>(REPOSITORY_TYPE.RestaurantRepository).toDynamicValue(getRestaurantRepository).inRequestScope();
    bind<Repository<Meal>>(REPOSITORY_TYPE.MealRepository).toDynamicValue(getMealRepository).inRequestScope();

});
