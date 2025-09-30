import { Webinar } from "@/types/common/webinar";

export interface SubscribedWebinarsProps {
    data: {
        webinars: Webinar[];
    }
    dictionary: Record<string, string>;
    lang: "en" | "pt";
    userId: string;
}