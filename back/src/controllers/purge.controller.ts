import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    response,
    request,
    httpGet
} from "inversify-express-utils";
import {REPOSITORY_TYPE} from "../constants/repository.types";
import {Meal} from "../entities/meal";
import {Repository} from "typeorm/repository/Repository";
import {Order} from "../entities/order";
import {OrderLine} from "../entities/orderLine";
import {OrderStatusHistory} from "../entities/orderStatusHistory";
import {Restaurant} from "../entities/restaurant";
import {User} from "../entities/user";
import {UserBlock} from "../entities/userBlock";

@controller("/api/purge")
export class PurgeController {
    private readonly _mealRepository: Repository<Meal>;
    private readonly _orderRepository: Repository<Order>;
    private readonly _orderLineRepository: Repository<OrderLine>;
    private readonly _orderStatusHistoryRepository: Repository<OrderStatusHistory>;
    private readonly _restaurantRepository: Repository<Restaurant>;
    private readonly _userRepository: Repository<User>;
    private readonly _userBlockRepository: Repository<UserBlock>;

    public constructor(
        @inject(REPOSITORY_TYPE.MealRepository) mealRepository: Repository<Meal>,
        @inject(REPOSITORY_TYPE.OrderRepository) orderRepository: Repository<Order>,
        @inject(REPOSITORY_TYPE.OrderLineRepository) orderLineRepository: Repository<OrderLine>,
        @inject(REPOSITORY_TYPE.OrderStatusHistoryRepository) orderStatusHistoryRepository: Repository<OrderStatusHistory>,
        @inject(REPOSITORY_TYPE.RestaurantRepository) restaurantRepository: Repository<Restaurant>,
        @inject(REPOSITORY_TYPE.UserRepository) userRepository: Repository<User>,
        @inject(REPOSITORY_TYPE.UserBlockRepository) userBlockRepository: Repository<UserBlock>,

    ) {
        this._mealRepository = mealRepository;
        this._orderRepository = orderRepository;
        this._orderLineRepository = orderLineRepository;
        this._orderStatusHistoryRepository = orderStatusHistoryRepository;
        this._restaurantRepository = restaurantRepository;
        this._userRepository = userRepository;
        this._userBlockRepository = userBlockRepository;
    }

    @httpGet("/")
    public async fetchByOrderId(
        @response() res: express.Response,
        @request() req: any
    ) {
        if(process.env.APP_ENV==='e2e'){
            await this._mealRepository.clear();
            await this._orderRepository.clear();
            await this._orderLineRepository.clear();
            await this._orderStatusHistoryRepository.clear();
            await this._restaurantRepository.clear();
            await this._userRepository.clear();
            await this._userBlockRepository.clear();
            return "done";
        }
        return null;
    }

}
