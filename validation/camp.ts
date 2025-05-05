import { Gender } from "@/types/enums/gender";
import { z } from "zod";

export const campSessionSchema = z.object({
  beginDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01)."),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01)."),
});

export const campChildSchema = z.object({
  firstName: z
    .string()
    .min(2, "Meno musí mať viac ako 2 znaky.")
    .max(50, "Meno nesmie byť dlhšie ako 50 znakov.")
    .regex(/^[A-Z][a-zA-Z\s]*$/, "Meno musí začínať veľkým písmenom a obsahovať len písmená."),
  lastName: z
    .string()
    .min(2, "Priezvisko musí mať viac ako 2 znaky.")
    .max(50, "Priezvisko nesmie byť dlhšie ako 50 znakov.")
    .regex(/^[A-Z][a-zA-Z\s]*$/, "Priezvisko musí začínať veľkým písmenom a obsahovať len písmená."),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01).")
    .nullable(),
  gender: z
    .enum([Gender.MALE, Gender.FEMALE]),
});