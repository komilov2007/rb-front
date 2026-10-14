import i18next from 'i18next'
import en from '@/assets/locales/en.json'
import ru from '@/assets/locales/ru.json'
import uz from '@/assets/locales/uz.json'
import tr from '@/assets/locales/tr.json'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const LANGUAGES = ['uz', 'ru', 'en', 'tr']

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || LANGUAGES[0],
    fallbackLng: LANGUAGES,
    supportedLngs: LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
    },
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      ru: {
        translation: ru,
      },
      uz: {
        translation: uz,
      },
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    react: {
      useSuspense: false,
    },
  })

export default i18next
