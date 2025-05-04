import { z } from "zod";

export const campSessionSchema = z.object({
  beginDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01)."),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01)."),
});