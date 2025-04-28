import { z } from "zod";

export const buffetSchema = z.object({
  actionAmount: z
    .string()
    .transform((val) => Number(val))
    .pipe(
      z
        .number({ invalid_type_error: "Nepovolený formát" })
        .nonnegative({ message: "Nesmie byť záporné" })
        .nullable()
    ),
});