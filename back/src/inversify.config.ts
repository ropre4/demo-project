import { AsyncContainerModule } from "inversify";
import { Repository } from "typeorm";
import { getDbConnection } from "./db";
import { REPOSITORY_TYPE } from "./constants/repository.types";
import {SERVICE_TYPE} from "./constants/service.types";
import {User} from "./entities/user";
import {getUserRepository} from "./repositories/user.repository";
import {getRestaurantRepository} from "./repositories/restaurant.repository";
import {getMealRepository} from "./repositories/meal.repository";
import {UserService} from "./services/user.service";
import {RestaurantService} from "./services/restaurant.service";
import {MealService} from "./services/meal.service";
import {Restaurant} from "./entities/restaurant";
import {Meal} from "./entities/meal";
import {OrderService} from "./services/order.service";
import {Order} from "./entities/order";
import {getOrderRepository} from "./repositories/order.repository";
import {OrderLine} from "./entities/orderLine";
import {getOrderLineRepository} from "./repositories/orderLine.repository";
import {OrderStatusHistory} from "./entities/orderStatusHistory";
import {getOrderStatusHistoryRepository} from "./repositories/orderStatusHistory";
import {UserBlockService} from "./services/userBlock.service";
import {UserBlock} from "./entities/userBlock";
import {getUserBlockRepository} from "./repositories/userBlock.repository";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    //Controllers
    await require("./controllers/user.controller");
    await require("./controllers/restaurant.controller");
    await require("./controllers/meal.controller");
    await require("./controllers/order.controller");
    await require("./controllers/userBlock.controller");
    await require("./controllers/userBlock.controller");
    if(process.env.APP_ENV === 'e2e') {
        await require("./controllers/purge.controller");
    }
    //Services
    bind<UserService>(SERVICE_TYPE.UserService).to(UserService).inSingletonScope();
    bind<RestaurantService>(SERVICE_TYPE.RestaurantService).to(RestaurantService).inSingletonScope();
    bind<MealService>(SERVICE_TYPE.MealService).to(MealService).inSingletonScope();
    bind<OrderService>(SERVICE_TYPE.OrderService).to(OrderService).inSingletonScope();
    bind<UserBlockService>(SERVICE_TYPE.UserBlockService).to(UserBlockService).inSingletonScope();
    //Repositories
    bind<Repository<User>>(REPOSITORY_TYPE.UserRepository).toDynamicValue(getUserRepository).inRequestScope();
    bind<Repository<Restaurant>>(REPOSITORY_TYPE.RestaurantRepository).toDynamicValue(getRestaurantRepository).inRequestScope();
    bind<Repository<Meal>>(REPOSITORY_TYPE.MealRepository).toDynamicValue(getMealRepository).inRequestScope();
    bind<Repository<Order>>(REPOSITORY_TYPE.OrderRepository).toDynamicValue(getOrderRepository).inRequestScope();
    bind<Repository<OrderLine>>(REPOSITORY_TYPE.OrderLineRepository).toDynamicValue(getOrderLineRepository).inRequestScope();
    bind<Repository<OrderStatusHistory>>(REPOSITORY_TYPE.OrderStatusHistoryRepository).toDynamicValue(getOrderStatusHistoryRepository).inRequestScope();
    bind<Repository<UserBlock>>(REPOSITORY_TYPE.UserBlockRepository).toDynamicValue(getUserBlockRepository).inRequestScope();

});
