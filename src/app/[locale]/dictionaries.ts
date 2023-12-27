import "server-only";

const dictionaries: {
    en: () => Promise<Dictionary>;
  [key: string]: () => Promise<Dictionary>;
} = {
  en: () => import("../../dictionaries/en.ts").then((module) => module.default),
  pt: () => import("../../dictionaries/pt.ts").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries["en"]();
