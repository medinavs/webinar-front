import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

export const betterAuthClient = createAuthClient({
    baseURL: 'http://localhost:8080',
    plugins: [
        adminClient()
    ]
})

export type Session = typeof betterAuthClient.$Infer.Session;
export type User = typeof betterAuthClient.$Infer.Session.user;