import { z } from "zod";

export const scheduleSchema = z.object({
  name: z.string().nonempty("Názov nesmie byť prázdny."),
  description: z.string().max(100, "Popis nesmie byť dlhší ako 100 znakov."),
  time: z.string()
    .nonempty("Čas nesmie byť prázdny.")
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Čas musí byť vo formáte HH:MM (napr. 14:30)."),
  date: z.string()
    .regex(/^\d{2}.\d{2}.\d{4}$/, "Dátum musí byť vo formáte DD.MM.YYYY (napr. 01.01.1970)."),
});
