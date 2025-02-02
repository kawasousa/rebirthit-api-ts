import { ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'

export function validateBody(schema: ZodSchema) {
    return function(req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }
}

export function validateParams(schema: ZodSchema) {
    return function(req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse(req.params);
            next();
        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }
}