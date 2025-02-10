import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
    if (res.headersSent) return next(err);

    if (err.status)
        res.status(err.status).json({ message: err.message });
    else {
        res.status(500).json({ message: 'internal server error' });
        console.error(err.stack);
    }
}