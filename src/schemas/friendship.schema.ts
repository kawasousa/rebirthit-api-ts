import { z } from "zod";

export const friendshipSchema = z.object({
    senderUsername: z.string(),
    receiverUsername: z.string(),
    status: z.string().optional(),
})