import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"
import { AUTH_URL } from "@/constants/environments/authUrl";

export const betterAuthClient = createAuthClient({
    baseURL: AUTH_URL,
    fetchOptions: {
        credentials: 'include',
    },
    plugins: [
        adminClient()
    ],
})

export type Session = typeof betterAuthClient.$Infer.Session;
export type User = typeof betterAuthClient.$Infer.Session.user;