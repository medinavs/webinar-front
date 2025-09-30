import z from "zod";

export const subscriptionSchema = z.object({
    name: z.string().min(2, "name_too_short"),
    email: z.email("email_invalid"),
    linkedinURL: z
        .url("linkedin_url_invalid")
        .optional()
        .or(z.literal("")),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
