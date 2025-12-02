import { z } from "zod";

export const messagesSchema = z.object({
  message: z.string(),
});

export const groupChatSchema = z.object({
  name: z
    .string()
    .min(1, "Názov četu nemôže byť prázdny")
    .max(50, "Názov četu môže mať maximálne 50 znakov")
    .nullable(),
});
