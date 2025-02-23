import { z } from "zod";

export const conversationSchema = z.object({
  userId: z.string().length(24, 'Invalid user id'), //mongodb userId has 24 characters
  isGroup: z.boolean().optional(),
  name: z.string().min(3, 'Name must have 3 characters').optional(),
  members: z.array(z.object({
    value: z.string().length(24, 'Invalid member id'),
  })).optional(),
})

export type ConversationSchema = z.infer<typeof conversationSchema>;