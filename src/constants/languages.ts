import { type LanguageTypes } from '@/types/language'
import { type SVGProps, type FunctionComponent } from 'react'
import { ReactComponent as IconFlagUz } from '@/assets/icons/flag-uz.svg'
import { ReactComponent as IconFlagRu } from '@/assets/icons/flag-ru.svg'
import { ReactComponent as IconFlagEn } from '@/assets/icons/flag-en.svg'
import { ReactComponent as IconFlagTr } from '@/assets/icons/flag-tr.svg'

type LanguageOptionProps = Record<
  LanguageTypes,
  {
    label: string
    checked: boolean
    shortLabel: string
    value: LanguageTypes
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  }
>

export const LANGUAGE_OPTIONS: LanguageOptionProps = {
  uz: {
    value: 'uz',
    // eslint-disable-next-line quotes
    label: "O'zbek",
    Icon: IconFlagUz,
    checked: false,
    // eslint-disable-next-line quotes
    shortLabel: "O'zb",
  },
  ru: {
    value: 'ru',
    label: 'Pусский',
    Icon: IconFlagRu,
    checked: false,
    shortLabel: 'Pуc',
  },
  en: {
    value: 'en',
    label: 'English',
    Icon: IconFlagEn,
    checked: false,
    shortLabel: 'Eng',
  },
  tr: {
    value: 'tr',
    label: 'Turkce',
    Icon: IconFlagTr,
    checked: false,
    shortLabel: 'Türk',
  },
}
