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
<<<<<<< HEAD
        lng: 'id', // Bahasa default
=======
        lng: 'en', // Bahasa default
>>>>>>> 78129090d8670bb214b32019d97b75ecf2941c9a
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;