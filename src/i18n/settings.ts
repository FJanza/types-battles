export const LANGUAGE = {
  EN: "en",
  ES: "es",
} as const;

export type DatasetLanguageKey = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export const fallbackLng = LANGUAGE.EN;
export const LANGUAGE_LIST: DatasetLanguageKey[] = [LANGUAGE.EN, LANGUAGE.ES];
export const defaultNS = "translation";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: LANGUAGE_LIST,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
