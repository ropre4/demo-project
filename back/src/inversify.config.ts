import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie";
import { getDbConnection } from "./db";
import { getRepository } from "./repositories/movie_repository";
import { REPOSITORY_TYPE } from "./constants/repository.types";
import {User} from "./entities/user";
import {getUserRepository} from "./repositories/user.repository";
import {UserService} from "./services/user.service";
import {SERVICE_TYPE} from "./constants/service.types";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    //Controllers
    await require("./controllers/movie_controller");
    await require("./controllers/user.controller");
    //Services
    bind<UserService>(SERVICE_TYPE.UserService).to(UserService).inSingletonScope();
    //Repositories
    bind<Repository<Movie>>(REPOSITORY_TYPE.MovieRepository).toDynamicValue(() => {
        return getRepository();
    }).inRequestScope();
    bind<Repository<User>>(REPOSITORY_TYPE.UserRepository).toDynamicValue(() => {
        return getUserRepository();
    }).inRequestScope();

});
