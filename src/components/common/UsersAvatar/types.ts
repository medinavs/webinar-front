export interface UsersAvatarProps {
    users: {
        id: string;
        name: string;
        avatarUrl: string;
    }[];
    maxAvatarsToShow?: number;
}