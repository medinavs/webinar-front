import { Webinar } from "@/types/common/webinar";

export interface SubscribedWebinarsProps {
    webinars: Webinar[];
    dictionary: Record<string, string>;
    lang: "en" | "pt";
}