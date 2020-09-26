import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    response,
    requestBody
} from "inversify-express-utils";
import {UserService} from "../services/user.service";
import {SERVICE_TYPE} from "../constants/service.types";
import {RegisterUserDTO} from "../dto/registerUserDTO";

@controller("/api/user")
export class UserController {
    private readonly _userService: UserService;
    public constructor(
        @inject(SERVICE_TYPE.UserService) userService: UserService
    ) {
        this._userService = userService;
    }

    @httpPost("/")
    public async post(
        @response() res: express.Response,
        @requestBody() newUser: RegisterUserDTO
    ) {
        try {
            return await this._userService.register(newUser);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
    @httpGet("/")
    public async get(
        @response() res: express.Response
    ) {
        try {
            return "TEST!"
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
}
