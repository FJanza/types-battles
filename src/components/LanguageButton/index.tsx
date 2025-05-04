"use client";
import {useEffect, useState, useRef} from "react";
import {useTranslation} from "react-i18next";
import {LANGUAGE_LIST} from "src/i18n/settings";

import FlagCircle from "./FlagCircle";

export default function LanguageButton() {
  const {t, i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const savedLanguage = localStorage.getItem("language");

  useEffect(() => {
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
    }
  }, [i18n, savedLanguage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpen(false);
  };

  return (
    <div
      ref={pickerRef}
      className="relative border-2 border-gray-300 rounded-md"
    >
      <div
        className="flex items-center px-2 py-1 justify-center gap-2 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        role="button"
      >
        <span className="bg-azul-195/50 rounded-full text-sm px-2">
          {t("language." + currentLanguage)}
        </span>
        <FlagCircle
          src={`/svg/${currentLanguage}-language-flag.svg`}
          alt="language-flag"
          size={18}
        />
      </div>
      {open && (
        <ul
          className="absolute left-0 mt-2 w-full bg-white border rounded shadow z-10 text-black"
          role="listbox"
        >
          {LANGUAGE_LIST.map((lang) => (
            <li
              key={lang}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                currentLanguage === lang ? "font-bold" : ""
              }`}
              onClick={() => handleSelect(lang)}
              role="option"
              aria-selected={currentLanguage === lang}
            >
              {t(`language.${lang}`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
