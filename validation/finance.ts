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
        .refine(
          (val) => {
            if (val === null) return true; // Skip validation if value is null
            const decimalPlaces = val.toString().split('.')[1]?.length || 0;
            return decimalPlaces <= 2;
          },
          { message: "Iba 2 desatinné miesta" }
        ),
    )
});