import { NativeModules, Platform } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/i18n/en.json';
import es from '../assets/i18n/es.json';

const resources = {
  en,
  es,
};

let locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

if (locale === undefined) {
  // iOS 13 workaround, take first of AppleLanguages array e.g. ["en", "en-NZ"]
  locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
  if (locale === undefined) {
    locale = 'en';
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: locale,
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
