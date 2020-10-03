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
import {authenticateJWT, validateRoleIsOwner} from "./jwt.middleware";
import {MealDTO} from "../dto/mealDTO";
import {UserBlockService} from "../services/userBlock.service";

@controller("/api/block", authenticateJWT)
export class UserBlockController {
    private readonly _userBlockService: UserBlockService;
    public constructor(
        @inject(SERVICE_TYPE.UserBlockService) userBlockService: UserBlockService
    ) {
        this._userBlockService = userBlockService;
    }

    @httpPost("/:userId")
    public async blockUser(
        @response() res: express.Response,
        @request() req: any,
        @requestParam("userId") userId: string,
        @requestBody() newMeal: MealDTO
    ) {
        validateRoleIsOwner(req.user, res);
        try {
            return await this._userBlockService.block(req.user.id, parseInt(userId));
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
}
