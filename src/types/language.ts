export type LanguageTypes = 'uz' | 'ru' | 'en' | 'tr'

export type TranslationProps = {
  [key in LanguageTypes as `name_${key}`]: string
}
