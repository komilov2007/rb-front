import { numberFormat } from './number-format'
import type { GroupsProps, VariantFormProps } from '@/types/product-online-shop'

export function convertList1ToList2(list1: GroupsProps[]) {
  const resultMap = new Map()

  for (const variant of list1) {
    for (const option of variant.options) {
      const key = JSON.stringify(option.name_translations)
      const valueKey = JSON.stringify(option.value_translations)

      if (!resultMap.has(key)) {
        resultMap.set(key, {
          ...option.name_translations,
          parentId: option.parentId,
          generateId: option.parentId,
          variantId: option.variantId,
          options: [],
          __valueKeys: new Set(),
        })
      }

      const group = resultMap.get(key)
      if (!group.__valueKeys.has(valueKey)) {
        group.options.push({
          ...option.value_translations,
          generateId: option.generateId,
          parentId: option.parentId,
          variantId: option.variantId,
        })
        group.__valueKeys.add(valueKey)
      }
    }
  }

  return Array.from(resultMap.values()).map(({ __valueKeys, ...rest }) => rest)
}

export function getPriceDisplay(groups: GroupsProps[]) {
  if (!groups.length) return ''

  const prices = groups.map(v => v.price).filter(p => p > 0)

  const min = Math.min(...prices)
  const max = Math.max(...prices)

  if (prices.length === 0 || (min === 0 && max === 0)) return ''

  if (min === max) return `${numberFormat(min)}`
  return `${numberFormat(min)} - ${numberFormat(max)}`
}

export function combineTwoOptions<T, U>(list1: T[], list2: U[]): Array<[T, U]> {
  const result: Array<[T, U]> = []
  for (const item1 of list1) {
    for (const item2 of list2) {
      result.push([item1, item2])
    }
  }
  return result
}

export const convertVariant = (
  variants: VariantFormProps[],
  oldGroups: GroupsProps[],
  group: string,
  price?: number,
) => {
  const mainVariant = variants.find(v => v.generateId === group)
  const otherOptions = variants.filter(v => v.generateId !== group)
  if (otherOptions.length === 1) {
    const groups = mainVariant?.options
      ?.map(o => {
        const options = otherOptions[0]?.options
          ?.map(t => {
            return [
              {
                generateId: o?.generateId,
                parentId: t?.parentId,
                name_translations: {
                  name_en: mainVariant?.name_en,
                  name_ru: mainVariant?.name_ru,
                  name_tr: mainVariant?.name_tr,
                  name_uz: mainVariant?.name_uz,
                },
                value_translations: {
                  name_en: o?.name_en,
                  name_ru: o?.name_ru,
                  name_tr: o?.name_tr,
                  name_uz: o?.name_uz,
                },
              },
              {
                generateId: t?.generateId,
                parentId: t?.parentId,
                name_translations: {
                  name_en: otherOptions[0]?.name_en,
                  name_ru: otherOptions[0]?.name_ru,
                  name_tr: otherOptions[0]?.name_tr,
                  name_uz: otherOptions[0]?.name_uz,
                },
                value_translations: {
                  name_en: t?.name_en,
                  name_ru: t?.name_ru,
                  name_tr: t?.name_tr,
                  name_uz: t?.name_uz,
                },
              },
            ]
          })
          ?.map(opt => {
            const findOption = oldGroups?.find(
              g =>
                g?.generateId === opt[opt.length - 1]?.generateId &&
                g.options[g?.options?.length - 1]?.parentId === opt[opt.length - 1]?.parentId,
            )

            return {
              options: opt,
              parentId: o?.parentId,
              photo: findOption?.photo ?? '',
              available: findOption?.available ?? 0,
              price: findOption?.price ?? price ?? 0,
              generateId: opt[opt.length - 1]?.generateId,
            }
          })

        return options
      })
      .flat()
    return groups?.filter(group => group !== undefined) as GroupsProps[]
  } else if (otherOptions.length === 2) {
    const groups =
      mainVariant?.options
        ?.map(v => {
          const firstOption = otherOptions[0]
          const secondOption = otherOptions[1]
          const newFirstOptions =
            firstOption.options?.map(t => {
              return {
                generateId: t?.generateId,
                parentId: t?.parentId,
                name_translations: {
                  name_en: firstOption?.name_en,
                  name_ru: firstOption?.name_ru,
                  name_tr: firstOption?.name_tr,
                  name_uz: firstOption?.name_uz,
                },
                value_translations: {
                  name_en: t?.name_en,
                  name_ru: t?.name_ru,
                  name_tr: t?.name_tr,
                  name_uz: t?.name_uz,
                },
              }
            }) ?? []
          const newSecondOptions =
            secondOption?.options?.map(t => {
              return {
                generateId: t?.generateId,
                parentId: t?.parentId,
                name_translations: {
                  name_en: secondOption?.name_en,
                  name_ru: secondOption?.name_ru,
                  name_tr: secondOption?.name_tr,
                  name_uz: secondOption?.name_uz,
                },
                value_translations: {
                  name_en: t?.name_en,
                  name_ru: t?.name_ru,
                  name_tr: t?.name_tr,
                  name_uz: t?.name_uz,
                },
              }
            }) ?? []

          const options = combineTwoOptions(newFirstOptions, newSecondOptions).map(opt => {
            const allOptions = [
              {
                generateId: v?.generateId,
                parentId: v?.parentId,
                name_translations: {
                  name_en: mainVariant?.name_en,
                  name_ru: mainVariant?.name_ru,
                  name_tr: mainVariant?.name_tr,
                  name_uz: mainVariant?.name_uz,
                },
                value_translations: {
                  name_en: v?.name_en,
                  name_ru: v?.name_ru,
                  name_tr: v?.name_tr,
                  name_uz: v?.name_uz,
                },
              },
              ...opt,
            ]

            const findOption = oldGroups.find(
              g =>
                g.options[0].parentId === allOptions[0].parentId &&
                g.options[1].parentId === allOptions[1].parentId &&
                g.options[2].parentId === allOptions[2].parentId,
            )

            return {
              options: allOptions,
              parentId: v.parentId,
              photo: findOption?.photo ?? '',
              available: findOption?.available ?? 0,
              price: findOption?.price ?? price ?? 0,
              generateId: allOptions.map(v => v.generateId).join('-'),
            }
          })

          return options
        })
        .flat() ?? []

    return groups
  } else {
    const groups =
      mainVariant?.options?.map(v => {
        const newOptions =
          otherOptions
            ?.map(t => {
              return t?.options?.map(o => ({
                parentId: t.generateId,
                generateId: o.generateId,
                name_translations: {
                  name_en: t.name_en,
                  name_ru: t.name_ru,
                  name_tr: t.name_tr,
                  name_uz: t.name_uz,
                },
                value_translations: {
                  name_en: o.name_en,
                  name_ru: o.name_ru,
                  name_tr: o.name_tr,
                  name_uz: o.name_uz,
                },
              }))
            })
            .flat()
            .filter(option => option !== undefined) ?? []

        const allOptions = [
          {
            generateId: v.generateId,
            parentId: mainVariant.generateId,
            name_translations: {
              name_en: mainVariant.name_en,
              name_ru: mainVariant.name_ru,
              name_tr: mainVariant.name_tr,
              name_uz: mainVariant.name_uz,
            },
            value_translations: {
              name_en: v.name_en,
              name_ru: v.name_ru,
              name_tr: v.name_tr,
              name_uz: v.name_uz,
            },
          },
          ...newOptions,
        ]
        const generateId = allOptions[allOptions.length - 1]?.generateId
        const findOption = oldGroups.find(a => a.generateId === generateId)
        return {
          options: allOptions,
          photo: findOption?.photo,
          parentId: mainVariant.generateId,
          available: findOption?.available ?? 0,
          price: findOption?.price ?? price ?? 0,
          generateId: allOptions[allOptions.length - 1]?.generateId,
        }
      }) ?? []

    return groups
  }
}
