import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    response,
    requestParam,
    requestBody,
    request,
    httpGet
} from "inversify-express-utils";
import {SERVICE_TYPE} from "../constants/service.types";
import {authenticateJWT, validateInfoBelongsToUser, validateRoleIsCustomer} from "./jwt.middleware";
import {OrderService} from "../services/order.service";
import {OrderWithLinesDTO} from "../dto/orderDTO";
import {MealService} from "../services/meal.service";
import {RestaurantService} from "../services/restaurant.service";

@controller("/api/order", authenticateJWT)
export class OrderController {
    private readonly _orderService: OrderService;
    private readonly _mealService: MealService;
    private readonly _restaurantService: RestaurantService;
    public constructor(
        @inject(SERVICE_TYPE.OrderService) orderService: OrderService,
        @inject(SERVICE_TYPE.MealService) mealService: MealService,
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService
    ) {
        this._orderService = orderService;
        this._mealService = mealService;
        this._restaurantService = restaurantService;
    }

    @httpPost("/restaurant/:restaurantId")
    public async createOrder(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("restaurantId") restaurantId: string,
        @requestBody() newOrder: OrderWithLinesDTO
    ) {
        validateRoleIsCustomer(req.user, res);
        try {
            const restaurant = await this._restaurantService.findById(parseInt(restaurantId));
            const meals = await this._mealService.findIdsByRestaurantId(
                restaurant.id,
                newOrder.lines.map(line=>line.mealId));
            return await this._orderService.create(newOrder, req.user, restaurant, meals);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/customer/:customerId")
    public async fetchByCustomerId(
        @response() res: express.Response,
        @requestParam("customerId") customerId: string,
        @request() req: any
    ) {
        validateRoleIsCustomer(req.user, res);
        validateInfoBelongsToUser(req.user.id, parseInt(customerId), res);

        return await this._orderService.findByCustomerId(parseInt(customerId));
    }
}
