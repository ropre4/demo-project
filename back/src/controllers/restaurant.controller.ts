import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    response,
    requestBody,
    request
} from "inversify-express-utils";
import {SERVICE_TYPE} from "../constants/service.types";
import {RestaurantService} from "../services/restaurant.service";
import {RestaurantDTO} from "../dto/restaurantDTO";
import {authenticateJWT} from "./jwt.middleware";

@controller("/api/restaurant", authenticateJWT)
export class RestaurantController {
    private readonly _restaurantService: RestaurantService;
    public constructor(
        @inject(SERVICE_TYPE.RestaurantService) restaurantService: RestaurantService
    ) {
        this._restaurantService = restaurantService;
    }

    @httpPost("/")
    public async post(
        @response() res: express.Response,
        @request() req: any,
        @requestBody() newRestaurant: RestaurantDTO
    ) {
        try {
            return await this._restaurantService.create(newRestaurant, req.user.id);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
}
