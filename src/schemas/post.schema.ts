import {z} from 'zod';

export const postSchema = z.object({
    content: z.string().min(3, {message: 'content must be longer than 3 characters'}),
    username: z.string(),
    title: z.string().min(3, {message: 'title must be longer than 3 characters'}).optional()
})