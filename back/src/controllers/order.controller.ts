import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    response,
    requestParam,
    requestBody,
    request
} from "inversify-express-utils";
import {SERVICE_TYPE} from "../constants/service.types";
import {authenticateJWT, validateRoleIsCustomer} from "./jwt.middleware";
import {OrderService} from "../services/order.service";
import {OrderWithLinesDTO} from "../dto/orderDTO";
import {MealService} from "../services/meal.service";

@controller("/api/restaurant/:restaurantId/order", authenticateJWT)
export class OrderController {
    private readonly _orderService: OrderService;
    private readonly _mealService: MealService;
    public constructor(
        @inject(SERVICE_TYPE.OrderService) orderService: OrderService,
        @inject(SERVICE_TYPE.MealService) mealService: MealService
    ) {
        this._orderService = orderService;
        this._mealService = mealService;
    }

    @httpPost("/")
    public async createOrder(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("restaurantId") restaurantId: string,
        @requestBody() newOrder: OrderWithLinesDTO
    ) {
        validateRoleIsCustomer(req.user, res);
        try {
            const meals = await this._mealService.findIdsByRestaurantId(parseInt(restaurantId), newOrder.lines.map(line=>line.mealId));
            return meals;
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }

}
