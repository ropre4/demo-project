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
import {MealService} from "../services/meal.service";
import {authenticateJWT, validateRoleIsOwner} from "./jwt.middleware";
import {MealDTO} from "../dto/mealDTO";
import {RestaurantService} from "../services/restaurant.service";

@controller("/api/restaurant/:restaurantId/meal", authenticateJWT)
export class MealController {
    private readonly _mealService: MealService;
    private readonly _restaurantService: RestaurantService;

    public constructor(
        @inject(SERVICE_TYPE.MealService) mealService: MealService,
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService
    ) {
        this._mealService = mealService;
        this._restaurantService = restaurantService;
    }

    @httpPost("/")
    public async createMeal(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("restaurantId") restaurantId: string,
    @requestBody() newMeal: MealDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            const restaurant = await this._restaurantService.findById(parseInt(restaurantId), []);
            if(restaurant.ownerId !== req.user.id) {
                res.status(403);
                return res.send(`This restaurant belongs to another Owner`);
            }
            return await this._mealService.create(newMeal, req.user.id, parseInt(restaurantId));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpPut("/:id")
    public async editMeal(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("id") id: string,
        @requestParam("restaurantId") restaurantId: string,
        @requestBody() meal: MealDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._mealService.edit(meal, req.user.id, parseInt(id));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpDelete("/:id")
    public async deleteMeal(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("id") id: string,
        @requestParam("restaurantId") restaurantId: string
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._mealService.delete(req.user.id, parseInt(id));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/")
    public async getByRestaurantId(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("restaurantId") restaurantId: string
    ) {

        return await this._mealService.findByRestaurantId(parseInt(restaurantId));

    }
}
