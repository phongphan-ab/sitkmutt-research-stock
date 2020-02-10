import i18next from 'i18next';
import { initReactI18next } from "react-i18next";

import translationEn from './i18next/i18n/en.json'
import translationTh from './i18next/i18n/th.json'

i18next
    .use(initReactI18next)
    .init({
        interpolation: {
            escapeValue: false
        },
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: translationEn,
            th: translationTh,
        },
    });

export default i18next
