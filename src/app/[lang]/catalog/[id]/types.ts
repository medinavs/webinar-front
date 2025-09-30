export interface CatalogDynamicPage {
    params: Promise<{
        lang: "en" | "pt",
        id: string
    }>
}