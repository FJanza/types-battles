"use client";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export default function LanguageInitializer() {
  const {i18n} = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  return null;
}
