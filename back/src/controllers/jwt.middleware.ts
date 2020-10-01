import * as jwt from "jsonwebtoken";
import {UserRole} from "../entities/user";

const accessTokenSecret = 'O1#QygYh4Ml2u#AGn#$6'; //TODO: move to .env

export const generateToken = (user) => {
    return jwt.sign(user, accessTokenSecret);
};

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
export function validateRoleIsOwner(user, res) {
    if (user.role !== UserRole.RESTAURANT_OWNER) {
        res.status(403);
        res.send(`User must be a Restaurant owner`);
    }
}
export function validateRoleIsCustomer(user, res) {
    if (user.role !== UserRole.CUSTOMER) {
        res.status(403);
        res.send(`User must be a Customer`);
    }
}
export function validateInfoBelongsToUser(tokenUserId: number, restUserId: number, res) {
    if (tokenUserId !== restUserId) {
        res.status(403);
        res.send(`This information belongs to another user`);
    }
}