type DefaultLanguagesProps<T extends string> = Record<`${T}_en`, string> &
  Record<`${T}_ru`, string> &
  Record<`${T}_uz`, string> &
  Record<`${T}_tr`, string>

export const defaultLanguages = <T extends string>(
  name: T,
  data: DefaultLanguagesProps<T>,
  isObjectReturn?: boolean,
): Array<[string, string]> | DefaultLanguagesProps<T> => {
  const result = {
    [`${name}_en`]:
      data[`${name}_en`] || data[`${name}_ru`] || data[`${name}_uz`] || data[`${name}_tr`],
    [`${name}_ru`]:
      data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_uz`] || data[`${name}_tr`],
    [`${name}_uz`]:
      data[`${name}_uz`] || data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_tr`],
    [`${name}_tr`]:
      data[`${name}_tr`] || data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_uz`],
  }

  if (isObjectReturn) {
    return result as DefaultLanguagesProps<T>
  }
  return Object.entries(result) as Array<[string, string]>
}

export type DefaultNameLanguagesProps = Record<'en', string> &
  Record<'ru', string> &
  Record<'uz', string> &
  Record<'tr', string>

export const defaultNameLanguages = <T extends string>(
  name: T,
  data: DefaultLanguagesProps<T>,
  isObjectReturn?: boolean,
): Array<[string, string]> | DefaultNameLanguagesProps => {
  const result = {
    en: data[`${name}_en`] || data[`${name}_ru`] || data[`${name}_uz`] || data[`${name}_tr`],
    ru: data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_uz`] || data[`${name}_tr`],
    uz: data[`${name}_uz`] || data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_tr`],
    tr: data[`${name}_tr`] || data[`${name}_ru`] || data[`${name}_en`] || data[`${name}_uz`],
  }

  if (isObjectReturn) {
    return result as DefaultNameLanguagesProps
  }
  return Object.entries(result) as Array<[string, string]>
}

interface CenvertLanguagesProps {
  en: string
  ru: string
  uz: string
  tr: string
}

export const cenvertLanguages = <T extends string>(name: T, data: CenvertLanguagesProps) => {
  const result = {
    [`${name}_en`]: data.en,
    [`${name}_ru`]: data.ru,
    [`${name}_uz`]: data.uz,
    [`${name}_tr`]: data.tr,
  }

  return result
}
