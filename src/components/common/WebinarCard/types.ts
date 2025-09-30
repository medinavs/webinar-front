import { Webinar } from "@/types/common/webinar";

export interface WebinarCardProps {
    webinar: Webinar;
    size?: "md" | "lg";
    lang: "en" | "pt";
    dictionary: Record<string, string>;
};