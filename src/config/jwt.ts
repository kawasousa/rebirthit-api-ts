import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { BadRequestError, InternalServerError, UnauthorizedError, UnprocessableEntityError } from '../errors';

dotenv.config();

const key = process.env.SECRET_TOKEN_KEY;

function generate(profileId: string): string {
    if (!key) {
        console.error(('SECRET_TOKEN_KEY is not defined in environment variables'));
        throw new InternalServerError('JWT secret key is missing. Contact the administrator.');
    }

    const token = jwt.sign({ profileId }, key, { expiresIn: '1d' });
    return token;
}

function validate(req: Request, res: Response, next: NextFunction) {
    if (!key) {
        console.error(('SECRET_TOKEN_KEY is not defined in environment variables'));
        throw new InternalServerError('JWT secret key is missing. Contact the administrator.');
    }

    const token = req.cookies.auth_token;

    if (!token) throw new BadRequestError('token not provided');

    try {
        const decoded = jwt.verify(token, key) as JwtPayload;

        if (!decoded.profileId) throw new UnauthorizedError('invalid token structure')

        req.profile = { profileId: decoded.profileId };
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error('JWT error: ',error);
            return next(new UnprocessableEntityError('token expired'));
        }

        if (error instanceof jwt.JsonWebTokenError) {
            console.error('JWT error: ',error);
            return next(new BadRequestError('invalid token'));
        }

        return next(error);
    }
}

export default { generate, validate };