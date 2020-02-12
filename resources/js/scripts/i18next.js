import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEn from './i18next/i18n/en.json'
import translationTh from './i18next/i18n/th.json'

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        interpolation: {
            escapeValue: false
        },
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: translationEn,
            th: translationTh,
        }
    });

window.i18next = i18next

export default i18next
