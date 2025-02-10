import { AppError } from "./AppError";

export class ConflitError extends AppError{
    constructor(message: string){
        super(message, 409);
    }
}