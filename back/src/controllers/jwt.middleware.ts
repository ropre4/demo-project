import * as jwt from "jsonwebtoken";

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