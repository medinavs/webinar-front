import z from "zod";

export const subscriptionSchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.email("Email inválido"),
    linkedinURL: z
        .url("URL do LinkedIn inválida")
        .optional()
        .or(z.literal("")),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
