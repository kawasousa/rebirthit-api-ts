import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const key = process.env.SECRET_TOKEN_KEY;

function createToken(profileId: string): string {
    if (!key) {
        throw new Error('SECRET_TOKEN_KEY is not defined in environment variables')
    }

    const token = jwt.sign({ profileId }, key, { expiresIn: '1d' });
    return token;
}

function validateToken(req: Request, res: Response, next: NextFunction) {
    if (!key) {
        throw new Error('SECRET_TOKEN_KEY is not defined in environment variables')
    }

    const token = req.cookies.auth_token;

    if (!token) {
        res.status(422).json({ error: 'Token not provided' })
        return;
    }

    try {
        const decoded = jwt.verify(token, key) as JwtPayload;

        if(!decoded.profileId){
            res.status(422).json({error: 'Invalid token structure'});
        }

        req.profile = { profileId: decoded.profileId};
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid provided token' })
        
    }
}

export default { createToken, validateToken }