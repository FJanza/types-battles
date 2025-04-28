import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import es from "../../public/locales/es/translation.json";
import en from "../../public/locales/en/translation.json";

const resources = {
  es: es,
  en: en,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources

    // if you're using a language detector, do not define the lng option
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
