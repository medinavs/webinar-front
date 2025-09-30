import { Webinar } from "@/types/common/webinar";

export interface AvatarWebinarCardProps {
    webinar: Webinar
    dictionary: Record<string, string>;
    lang: "en" | "pt"
}