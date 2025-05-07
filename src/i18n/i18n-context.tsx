/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {useEffect} from "react";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {I18nextProvider as Provider, initReactI18next} from "react-i18next";

import {getOptions} from "./settings";

import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    resources: {
      en: {translation: enTranslation},
      es: {translation: esTranslation},
    },
    ...getOptions(),
  });

interface I18nProviderProps {
  children: React.ReactNode;
  language: string;
}

export function I18nProvider({children, language}: I18nProviderProps) {
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);
  return <Provider i18n={i18next}>{children}</Provider>;
}
