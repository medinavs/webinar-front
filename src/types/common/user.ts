export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    banned: boolean;
    banReason: string | null;
    banExpires: string | null;
}