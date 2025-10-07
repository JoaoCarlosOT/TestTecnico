import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
});

export const userUpdateSchema = userSchema.partial();
