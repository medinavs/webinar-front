export interface MeDynamicPage {
    params: Promise<{
        lang: "en" | "pt",
        id: string
    }>
}