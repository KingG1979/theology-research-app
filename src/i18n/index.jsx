import { createContext, useContext, useState, useEffect } from "react";
import en from "./en.js";
import de from "./de.js";

const translations = { en, de };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("cacr-lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("cacr-lang", lang);
  }, [lang]);

  const t = translations[lang] || translations.en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
