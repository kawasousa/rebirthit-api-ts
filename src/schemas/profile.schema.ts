import { z } from 'zod'

export const profileSchema = z.object({
    username: z.string().min(3, 'username must be longer than 3 characters').max(30, 'username must be less than 30 characters'),
    email: z.string().email(),
    name: z.string().min(3, 'name must be longer than 3 characters').max(50, 'name must bem less than 50 characters'),
    icon: z.string(),
    password: z.string().min(4, 'password must be longer than 3 characters').max(30, 'password must be less than 30 characters'),
    role: z.string(),
})