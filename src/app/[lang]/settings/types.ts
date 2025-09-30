export interface SettingsDynamicPage {
    params: Promise<{
        lang: "en" | "pt"
        userId: string
    }>
}