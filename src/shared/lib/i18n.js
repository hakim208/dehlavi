import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/translation.json";
import ru from "../locales/ru/translation.json";
import tj from "../locales/tj/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tj: { translation: tj },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: "ru", // ← default language боқӣ мемонад (Tajik)
    fallbackLng: "en", // Агар тарҷума барои key ёфт нашуд, EN нишон дода мешавад
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
