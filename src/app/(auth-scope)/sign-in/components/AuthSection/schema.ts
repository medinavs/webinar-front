import z, { email } from "zod";

export const AuthSchema = z.object({
    email: z.email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type AuthSchemaType = z.infer<typeof AuthSchema>;