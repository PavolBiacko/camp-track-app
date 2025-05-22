import { z } from "zod";

export const childAccessCodeSchema = z.object({
  accessCode: z
    .string()
    .regex(/^[A-Za-z0-9]*$/, { message: 'Iba písmená a čísla' }),
});