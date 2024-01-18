import "server-only";

export const dictionaries: {
  en: () => Promise<Dictionary>;
  [key: string]: () => Promise<Dictionary>;
} = {
  en: () => import("./en.ts").then((module) => module.default),
  pt: () => import("./pt.ts").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries["en"]();
