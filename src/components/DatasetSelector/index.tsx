import React from "react";
import {useTranslation} from "react-i18next";

import {useGameSettings} from "src/context/GameSettings";
import {LANGUAGE_LIST} from "src/i18n/settings";

const DatasetSelector = () => {
  const {datasetLanguage, setDatasetLanguage} = useGameSettings();
  const {t} = useTranslation();

  return (
    <div className="dataset-selector mt-4">
      <h3 className="text-gray-300 mb-2">{t("common.languageDataset")}</h3>
      <div className="flex flex-row gap-2 justify-center">
        {LANGUAGE_LIST.map((lang) => (
          <button
            key={lang}
            onClick={() => setDatasetLanguage(lang)}
            className={`
              px-4 py-2 rounded-md transition-all duration-300
              ${
                datasetLanguage === lang
                  ? "bg-white text-gray-800 font-medium"
                  : "bg-transparent text-white border border-white hover:bg-white/20"
              }
            `}
          >
            {t(`language.${lang}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatasetSelector;
