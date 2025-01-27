import {
  createI18nHooksAndProvider,
  type TranslatedI18n,
  type Localize as LocalizeBase,
} from "@hilma/i18n";
import { createRef } from "react";

import { createI18n, Language } from "./i18n-init";
import * as texts from "./texts";

const i18n = createI18n({ ...texts });
export const {
  I18nProvider,
  contexts,
  useLanguage,
  createI18nHook,
  isLanguage,
  useChangeLanguage,
  useDirection,
  useLanguageEffect,
  useNoLanguagePathname,
  usePathLanguage,
  useSwitchedPath,
  createTranslatedI18nHook,
  createTranslateTextsHook,
  useTransform,
  useTransformObject,
  createTranslateHook,

  LanguageRoutes,
} = createI18nHooksAndProvider(Language, i18n);

export type I18n = typeof i18n;
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- because
export type Localize<T = any> = LocalizeBase<Language, T>;
export const useTranslate = createTranslateHook<I18n>();
export const useTranslatedI18n = createTranslatedI18nHook<I18n>();
export const useTranslateTexts = createTranslateTextsHook<I18n>();
export const useI18n = createI18nHook<I18n>();
export const createI18nRef = () => createRef<TranslatedI18n<I18n>>();
