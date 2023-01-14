import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next  } from 'react-i18next';

import EN from './en.json';
import AR from './ar.json';
import KR from './kr.json';

const resources = {
  ar: {
      translation: AR
  },
    en: {
        translation: EN
    },
    kr: {
        translation: KR
    }
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;