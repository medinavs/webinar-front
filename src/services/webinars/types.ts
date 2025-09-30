export interface findAllWebinarsPayload {
    filters: {
        category?: string;
        language?: string;
        speakerId?: string;
        dateFrom?: Date;
        dateTo?: Date;
        search?: string;
    }
}

export interface createWebinarRegistrationPayload {
    webinarId: string;
    email: string;
    name: string;
    linkedinURL?: string;
}