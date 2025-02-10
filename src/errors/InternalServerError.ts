import { AppError } from "./AppError";

export class InternalServerError extends AppError {
    constructor(message = "internal server error") {
        super(message, 500);
    }
}