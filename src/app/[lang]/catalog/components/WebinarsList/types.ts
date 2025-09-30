import { Webinar } from "@/types/common/webinar";

export interface WebinarsListProps {
    data: {
        webinars: Webinar[];
    };
    dictionary: Record<string, string>;
    lang: "en" | "pt";
}