import { Webinar } from "@/types/common/webinar";

export interface FeaturedWebinarProps {
    webinar: Webinar;
    size?: "md" | "lg";
    dictionary: Record<string, string>;
    lang: "en" | "pt";
};