export const fallbackLng = "en";
export const LANGUAGE_LIST = [fallbackLng, "es"];
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
