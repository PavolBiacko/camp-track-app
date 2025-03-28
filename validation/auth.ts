import { z } from "zod";

const PASSWORD_LENGTH = 6;

// Base schema for email and password
const baseAuthSchema = z.object({
  email: z.string().email("Neplatný email."),
  password: z.string().min(PASSWORD_LENGTH, `Heslo musí byť aspoň ${PASSWORD_LENGTH} znakov dlhé.`),
});

export const signInSchema = baseAuthSchema;

export const signUpSchema = baseAuthSchema.extend({
  firstName: z.string().nonempty("Meno nesmie byť prázdne."),
  lastName: z.string().nonempty("Priezvisko nesmie byť prázdne."),
  passwordCheck: z.string().min(PASSWORD_LENGTH, `Potvrdenie hesla musí byť aspoň ${PASSWORD_LENGTH} znakov dlhé.`),
}).refine((data) => data.password === data.passwordCheck, {
  message: "Heslá sa nezhodujú.",
  path: ["passwordCheck"],
});
