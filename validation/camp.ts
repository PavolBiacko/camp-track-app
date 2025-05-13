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
    .regex(/^\p{Lu}\p{Ll}*(\s+\p{Lu}\p{Ll}*)*$/u, "Meno musí začínať veľkým písmenom a obsahovať len písmená."),
  lastName: z
    .string()
    .min(2, "Priezvisko musí mať viac ako 2 znaky.")
    .max(50, "Priezvisko nesmie byť dlhšie ako 50 znakov.")
    .regex(/^\p{Lu}\p{Ll}*(\s+\p{Lu}\p{Ll}*)*$/u, "Priezvisko musí začínať veľkým písmenom a obsahovať len písmená."),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Dátum musí byť vo formáte YYYY.MM.DD (napr. 1970-01-01).")
    .nullable(),
  gender: z
    .enum([Gender.MALE, Gender.FEMALE]),
});

export const campGroupSchema = z.object({
  number: z
    .string()
    .nonempty({ message: "Povinné" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "Zlý formát" })
    .pipe(
      z
        .number({ message: "Číslo musí byť celé číslo." })
        .int("Číslo")
        .min(1, "< 1")
        .max(100, "> 100")
    )
    .transform((val) => val.toString()), // Transform back to string to match GroupFormInputsCore
  name: z
    .string()
    .nullable(),
  sessionId: z
    .string({ message: "Turnus je povinný." })
    .transform((val) => parseInt(val, 10)) // Transform to number for validation
    .refine((val) => !isNaN(val), { message: "Nepovolený formát" })
    .pipe(
      z
        .number()
        .int("ID turnusu musí byť celé číslo.")
        .positive("ID turnusu musí byť kladné.")
        .min(1, "ID turnusu musí byť väčšie ako 0.")
    )
    .transform((val) => val.toString()), // Transform back to string to match GroupFormInputsCore
  leaderId: z
    .string()
    .uuid("ID vedúceho musí byť platný UUID.")
    .nullable(),
});