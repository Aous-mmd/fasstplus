import i18n from 'i18next';
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