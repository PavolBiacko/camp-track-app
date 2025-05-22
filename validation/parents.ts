import { z } from "zod";

export const childAccessCodeSchema = z.object({
  accessCode: z
    .string()
    .regex(/^[A-Z0-9]*$/, { message: 'Iba veľké tlačené písmená a čísla' }),
});