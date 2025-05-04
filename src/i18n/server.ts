import acceptLanguage from "accept-language";
import {cookies as getCookies, headers as getHeaders} from "next/headers";
import "server-only";

import {fallbackLng, LANGUAGE_LIST} from "./settings";

acceptLanguage.languages(LANGUAGE_LIST);

const cookieName = "i18next";

export async function detectLanguage() {
  const cookies = getCookies();
  const headers = getHeaders();

  let language;
  if (!language && cookies.has(cookieName)) {
    language = acceptLanguage.get(cookies.get(cookieName)?.value);
  }
  if (!language) {
    language = acceptLanguage.get(headers.get("Accept-Language"));
  }
  if (!language) {
    language = fallbackLng;
  }
  return language;
}
