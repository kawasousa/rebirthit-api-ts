import { AppError } from "./AppError";

export class ForbidenError extends AppError{
    constructor(message: string){
        super(message, 403);
    }
}