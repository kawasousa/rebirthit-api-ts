import { z } from 'zod'

export const idSchema = z.object({
    id: z.string().uuid({ message: 'id must be in uuid pattern' })
})