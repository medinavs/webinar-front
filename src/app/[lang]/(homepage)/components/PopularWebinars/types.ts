import { Webinar } from "@/types/common/webinar";

export interface PopularWebinarsProps {
    popularWebinars: Webinar[]
    dictionary: Record<string, string>;
    lang: "en" | "pt";
}