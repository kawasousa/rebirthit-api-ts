import { ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'

export function validate(schema: ZodSchema) {
    return function(req: Request, res: Response, next: NextFunction) {
        try {
            schema.parse(req.body);
            next();
        } catch (err: any) {
            res.status(400).json({ error: err.errors })
        }
    }
}