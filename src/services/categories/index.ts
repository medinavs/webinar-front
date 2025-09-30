import { axiosInstance } from "@/lib/axios";

export class Categories {
    findAll = async ({ }) => {
        try {
            const response = await axiosInstance.get("/categories")

            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
}