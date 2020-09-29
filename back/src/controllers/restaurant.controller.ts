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
import {authenticateJWT, validateRoleIsOwner} from "./jwt.middleware";

@controller("/api/restaurant", authenticateJWT)
export class RestaurantController {
    private readonly _restaurantService: RestaurantService;
    public constructor(
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService
    ) {
        this._restaurantService = restaurantService;
    }

    @httpGet("/")
    public async fetchRestaurants(
        @response() res: express.Response,
        @request() req: any
    ) {
        return await this._restaurantService.fetch();
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
        if (ownerId.toString() !== req.user.id.toString()) {
            res.status(403);
            res.send(`This user cannot perform this action`);
        }
        validateRoleIsOwner(req.user, res);

        return await this._restaurantService.findByOwnerId(parseInt(ownerId));

    }
}
