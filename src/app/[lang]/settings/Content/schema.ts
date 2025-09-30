import z from "zod";

export const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.url("invalid url").optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;