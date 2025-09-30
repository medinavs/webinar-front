import { axiosInstance } from "@/lib/axios";
import { createWebinarRegistrationPayload, findAllWebinarsPayload } from "./types"

export class Webinars {
    findAll = async ({ filters }: findAllWebinarsPayload) => {
        try {
            const { category, language, speakerId, dateFrom, dateTo, search } = filters;

            const response = await axiosInstance.get("/webinars", {
                params: {
                    category,
                    language,
                    speakerId,
                    dateFrom: dateFrom?.toISOString(),
                    dateTo: dateTo?.toISOString(),
                    search,
                }
            })

            return response.data;
        } catch (error) {
            console.error("Error fetching webinars:", error);
        }
    }

    findRecents = async () => {
        try {
            const response = await axiosInstance.get("/webinars/recents");
            return response.data;
        } catch (error) {
            console.error("Error fetching recent webinars:", error);
        }
    }

    findPopulars = async () => {
        try {
            const response = await axiosInstance.get("/webinars/populars");
            return response.data;
        } catch (error) {
            console.error("Error fetching popular webinars:", error);
        }
    }

    findById = async (id: string) => {
        try {
            if (!id) throw new Error("Webinar ID is required");

            const response = await axiosInstance.get(`/webinars/${id}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching webinar by ID:", error);
        }
    }

    findRegisteredByUser = async (userId: string) => {
        try {
            if (!userId) throw new Error("User ID is required");

            const response = await axiosInstance.get(`/webinars/registered/${userId}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching registered webinars:", error);
        }
    }

    registerUser = async ({
        webinarId,
        email,
        name,
        linkedinURL
    }: createWebinarRegistrationPayload) => {
        try {
            const response = await axiosInstance.post(`/webinars/${webinarId}/registrations`, {
                email,
                name,
                linkedinURL
            });

            return response.data;
        } catch (error) {
            console.error("Error creating webinar registration:", error);
        }
    }
}