import { Request, Response, NextFunction } from "express";
import { z } from 'zod';
import { postSchema } from "../schemas/post.schema";
import { idSchema } from "../schemas/id.schema";
import { profileSchema } from "../schemas/profile.schema";
import { friendshipSchema } from "../schemas/friendship.schema";
import { BadRequestError } from "../errors";

export function validatePost(req: Request, res: Response, next: NextFunction) {
    try {
        postSchema.parse(req.body);
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue) => {
                const isRequiredField = issue.message.toLowerCase().includes('is required');
                return {
                    message: issue.message,
                    path: issue.path.join('.'),
                    isRequiredField
                };
            });

            const errorMessage = issues.map((issue) => {
                return issue.isRequiredField
                    ? `${issue.path} is required`
                    : `${issue.path}: ${issue.message}`
            }).join(', ');

            next(new BadRequestError(errorMessage));
            return;
        }

        next(error);
    }
}

export function validateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        profileSchema.parse(req.body);
        next();
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue) => {
                const isRequiredField = issue.message.toLowerCase().includes('is required');
                return {
                    message: issue.message,
                    path: issue.path.join('.'),
                    isRequiredField
                };
            });

            const errorMessage = issues.map((issue) => {
                return issue.isRequiredField
                    ? `${issue.path} is required`
                    : `${issue.path}: ${issue.message}`
            }).join(', ');

            next(new BadRequestError(errorMessage));
            return;
        }

        next(error);
    }
}

export function validateId(req: Request, res: Response, next: NextFunction) {
    try {
        idSchema.parse(req.params);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue) => {
                const isRequiredField = issue.message.toLowerCase().includes('is required');
                return {
                    message: issue.message,
                    path: issue.path.join('.'),
                    isRequiredField
                };
            });

            const errorMessage = issues.map((issue) => {
                return issue.isRequiredField
                    ? `${issue.path} is required`
                    : `${issue.path}: ${issue.message}`
            }).join(', ');

            next(new BadRequestError(errorMessage));
            return;
        }

        next(error);
    }
}

export function validateFriendship(req: Request, res: Response, next: NextFunction) {
    try {
        friendshipSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = error.issues.map((issue) => {
                const isRequiredField = issue.message.toLowerCase().includes('required');
                return {
                    message: issue.message,
                    path: issue.path.join('.'),
                    isRequiredField
                };
            });

            const errorMessage = issues.map((issue) => {
                return issue.isRequiredField
                    ? `${issue.path} is required`
                    : `${issue.path}: ${issue.message}`
            }).join(', ');

            next(new BadRequestError(errorMessage));
            return;
        }

        next(error);
    }
}