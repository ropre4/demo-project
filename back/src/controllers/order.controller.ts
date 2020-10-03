import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    response,
    requestParam,
    requestBody,
    request,
    httpGet,
    httpPut
} from "inversify-express-utils";
import {SERVICE_TYPE} from "../constants/service.types";
import {
    authenticateJWT,
    validateInfoBelongsToUser,
    validateRoleIsCustomer,
    validateRoleIsOwner
} from "./jwt.middleware";
import {OrderService} from "../services/order.service";
import {OrderWithLinesDTO} from "../dto/orderDTO";
import {MealService} from "../services/meal.service";
import {RestaurantService} from "../services/restaurant.service";
import {UserBlockService} from "../services/userBlock.service";

@controller("/api/order", authenticateJWT)
export class OrderController {
    private readonly _orderService: OrderService;
    private readonly _mealService: MealService;
    private readonly _restaurantService: RestaurantService;
    private readonly _userBlockService: UserBlockService;
    public constructor(
        @inject(SERVICE_TYPE.OrderService) orderService: OrderService,
        @inject(SERVICE_TYPE.MealService) mealService: MealService,
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService,
        @inject(SERVICE_TYPE.UserBlockService) userBlockService: UserBlockService
    ) {
        this._orderService = orderService;
        this._mealService = mealService;
        this._restaurantService = restaurantService;
        this._userBlockService = userBlockService;
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
            const blocks = await this._userBlockService.findByUserId(req.user.id);
            const restaurant = await this._restaurantService.findById(parseInt(restaurantId), blocks.map(bl=>bl.ownerId));
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
    @httpGet("/owner/:ownerId")
    public async fetchByOwnerId(
        @response() res: express.Response,
        @requestParam("ownerId") ownerId: string,
        @request() req: any
    ) {
        validateRoleIsOwner(req.user, res);
        validateInfoBelongsToUser(req.user.id, parseInt(ownerId), res);

        return await this._orderService.findByOwnerId(parseInt(ownerId));
    }
    @httpGet("/:orderId")
    public async fetchByOrderId(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        return await this._orderService.findById(parseInt(orderId), parseInt(req.user.id));
    }
    @httpPut("/:orderId/cancel")
    public async cancelOrder(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        validateRoleIsCustomer(req.user, res);
        return await this._orderService.cancel(parseInt(orderId), parseInt(req.user.id));
    }
    @httpPut("/:orderId/process")
    public async processOrder(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        validateRoleIsOwner(req.user, res);
        return await this._orderService.process(parseInt(orderId), parseInt(req.user.id));
    }
    @httpPut("/:orderId/inroute")
    public async inRouteOrder(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        validateRoleIsOwner(req.user, res);
        return await this._orderService.inRoute(parseInt(orderId), parseInt(req.user.id));
    }
    @httpPut("/:orderId/deliver")
    public async deliverOrder(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        validateRoleIsOwner(req.user, res);
        return await this._orderService.deliver(parseInt(orderId), parseInt(req.user.id));
    }
    @httpPut("/:orderId/receive")
    public async receiveOrder(
        @response() res: express.Response,
        @requestParam("orderId") orderId: string,
        @request() req: any
    ) {
        validateRoleIsCustomer(req.user, res);
        return await this._orderService.receive(parseInt(orderId), parseInt(req.user.id));
    }
}
