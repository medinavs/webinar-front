import { Webinar } from "@/types/common/webinar";

export interface ProfileWebinarCardProps {
    webinar: Webinar
    dictionary: Record<string, string>;
    lang: "en" | "pt"
}