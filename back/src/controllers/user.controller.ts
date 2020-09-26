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
import {RegisterUserDTO} from "../dto/userDTO";

import * as jwt from "jsonwebtoken";
const accessTokenSecret = 'O1#QygYh4Ml2u#AGn#$6'; //TODO: move to .env

@controller("/api/user")
export class UserController {
    private readonly _userService: UserService;
    public constructor(
        @inject(SERVICE_TYPE.UserService) userService: UserService
    ) {
        this._userService = userService;
    }

    @httpPost("/")
    public async register(
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
    @httpPost("/login")
    public async login(
        @response() res: express.Response,
        @requestBody() newUser: RegisterUserDTO
    ) {
        try {
            const safeUser = await this._userService.login(newUser);
            const accessToken = jwt.sign(safeUser, accessTokenSecret);

            return {
                user: safeUser,
                token: accessToken
            }
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }
}
