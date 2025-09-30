import 'server-only'

const dictionaries = {
    en: () => import('../../../../public/locales/en.json').then((module) => module.default),
    pt: () => import('../../../../public/locales/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'pt') =>
    dictionaries[locale ?? 'pt']()