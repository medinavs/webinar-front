import { betterAuthClient } from "@/instances/auth/auth";
import { User } from "@/types/common/user";

export class Auth {
    constructor() { }

    async signIn(email: string, password: string) {
        try {
            const response = await betterAuthClient.signIn.email({
                email,
                password,
                callbackURL: 'http://localhost:3000'
            });

            if (response.error) {
                throw new Error(response.error.message);
            }

            return response;
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    }

    async signUp(data: {
        name: string;
        email: string;
        password: string;
    }) {
        try {
            const response = await betterAuthClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
                callbackURL: 'http://localhost:3000'
            });

            return response;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }

    async signOut() {
        try {
            return await betterAuthClient.signOut();
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    }

    async getSession() {
        try {
            return await betterAuthClient.getSession();
        } catch (error) {
            console.error("Get session error:", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            const session = await this.getSession();
            return session?.data?.user || null;
        } catch (error) {
            console.error("Get current user error:", error);
            return null;
        }
    }

    async updateUser(userData: Partial<User>) {
        try {
            const userUpdated = await betterAuthClient.updateUser({
                name: userData.name,
                image: userData.image === "" ? undefined : userData.image,
            })

            if (userUpdated.error) {
                throw new Error(userUpdated.error.message);
            }

            return userUpdated;
        } catch (error) {
            console.error("Update user error:", error);
            throw error;
        }
    }
}