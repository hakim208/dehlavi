import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/translation.json";
import ru from "../locales/ru/translation.json";
import tj from "../locales/tj/translation.json";

// ИСЛОҲ: Аввал аз localStorage мехонем, агар холӣ бошад, дефолт "ru" мегирем
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem("app_lang") || "ru" : "ru";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tj: { translation: tj },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: savedLanguage, // ← Акнун инҷо динамикӣ шуд ва забони интихобкардаатон меистад
    fallbackLng: "en", // Агар тарҷума барои key ёфт нашуд, EN нишон дода мешавад
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
