import { Webinar } from "@/types/common/webinar";

export interface LatestWebinarsProps {
    webinars: Webinar[];
    dictionary: Record<string, string>;
    lang: "en" | "pt";
}