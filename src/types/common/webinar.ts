export interface Webinar {
    id: string;
    title: string;
    date: string;
    speaker: {
        id: string;
        name: string;
        image: string | null;
    };
    category: string;
    imageUrl: string;
    link: string | null;
    description: string;
    speakerImageUrl?: string;
    duration: number;
    users?: {
        id: string;
        name: string;
        avatarUrl: string;
    }[];
    speakerId: string;
    createdAt: string;
    updatedAt?: string;
    registrations?: {
        id: string;
        createdAt: string;
        userId: string;
        webinarId: string;
        name: string;
        email: string;
        linkedinURL: string;
        user?: {
            id: string;
            name: string;
            image: string | null;
        };
    }[]; _count?: {
        registrations: number;
    };
    language?: string;
    registrationDate?: string; // user's registration date
}