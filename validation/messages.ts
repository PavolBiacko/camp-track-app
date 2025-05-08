import { z } from "zod";

export const messagesSchema = z.object({
  message: z.string()
});