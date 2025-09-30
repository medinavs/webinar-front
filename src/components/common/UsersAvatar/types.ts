export interface UsersAvatarProps {
    users: {
        id: string;
        name: string;
        image: string;
    }[];
    maxAvatarsToShow?: number;
}