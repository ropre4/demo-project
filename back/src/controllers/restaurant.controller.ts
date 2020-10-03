import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    httpGet,
    response,
    requestParam,
    requestBody,
    request,
    httpPut,
    httpDelete
} from "inversify-express-utils";
import {SERVICE_TYPE} from "../constants/service.types";
import {RestaurantService} from "../services/restaurant.service";
import {RestaurantDTO} from "../dto/restaurantDTO";
import {
    authenticateJWT,
    validateInfoBelongsToUser,
    validateRoleIsCustomer,
    validateRoleIsOwner
} from "./jwt.middleware";
import {UserBlockService} from "../services/userBlock.service";

@controller("/api/restaurant", authenticateJWT)
export class RestaurantController {
    private readonly _restaurantService: RestaurantService;
    private readonly _userBlockService: UserBlockService;
    public constructor(
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService,
        @inject(SERVICE_TYPE.UserBlockService) userBlockService: UserBlockService
    ) {
        this._restaurantService = restaurantService;
        this._userBlockService = userBlockService;
    }

    @httpGet("/")
    public async fetchRestaurants(
        @response() res: express.Response,
        @request() req: any
    ) {
        try {
            validateRoleIsCustomer(req.user, res);
            const blocks = await this._userBlockService.findByUserId(req.user.id);
            return await this._restaurantService.fetch(blocks.map(bl=>bl.ownerId));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpPost("/")
    public async createRestaurant(
        @response() res: express.Response,
        @request() req: any,
        @requestBody() newRestaurant: RestaurantDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._restaurantService.create(newRestaurant, req.user.id);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpPut("/:id")
    public async editRestaurant(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("id") id: string,
        @requestBody() restaurant: RestaurantDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._restaurantService.edit(restaurant, req.user.id, parseInt(id));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpDelete("/:id")
    public async deleteRestaurant(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("id") id: string,
        @requestBody() newRestaurant: RestaurantDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._restaurantService.delete(req.user.id, parseInt(id));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/owner/:ownerId")
    public async getByOwnerId(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("ownerId") ownerId: string
    ) {
        validateRoleIsOwner(req.user, res);
        validateInfoBelongsToUser(req.user.id, parseInt(ownerId), res);

        return await this._restaurantService.findByOwnerId(parseInt(ownerId));

    }
}
