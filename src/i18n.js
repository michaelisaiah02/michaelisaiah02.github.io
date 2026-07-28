import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import idTranslation from './locales/id.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            id: { translation: idTranslation }
        },
        lng: 'en', // Bahasa default
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;