import { toast } from 'react-toastify'
import { type IkpuProps } from '@/types/ikpu'
import { useTranslation } from 'react-i18next'
import { useState, type SyntheticEvent } from 'react'
import { getIkpuTax, updateIkpuOnlineShop } from '@/apis/admin/ikpu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface OptionProps {
  label: string
  value: string
}

type RowProps = Partial<Pick<IkpuProps, 'mxik_code' | 'package_code' | 'unit_code'>>

export interface InputProps {
  id: number
  value: string | null
  handleUpdateRow: (values: RowProps, id: number) => void
}

export const useInput = ({ id, value, handleUpdateRow }: InputProps) => {
  const { t } = useTranslation()
  const [option, setOption] = useState<OptionProps | null>(value ? { value, label: value } : null)
  const [data, setData] = useState<OptionProps[]>([])
  const [search, setSearch] = useState('')
  const [mxikCode, setMxikCode] = useState(value)

  const { isLoading } = useQuery({
    enabled: !value,
    queryKey: [REACT_QUERY_KEYS.IKPU_TAX_LIST, search],
    queryFn: async () => await getIkpuTax({ search, lang: 'uz' }),
    select: res => {
      const data = res.data.map(t => ({
        label: `${t.mxikCode} , ${t.subPositionName}`,
        value: t.mxikCode,
      }))
      return { ...res, data }
    },
    onSuccess: res => {
      if (search === '' || mxikCode) {
        setData(
          value
            ? [
                {
                  value: String(value),
                  label: String(value),
                },
              ]
            : [],
        )
      } else {
        setData(res.data)
      }
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (data: RowProps) => await updateIkpuOnlineShop(data, id),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleInputChange = (_: SyntheticEvent<Element, Event>, search: string) => {
    setSearch(search)
  }

  const handleChange = (_: SyntheticEvent, option: OptionProps | null) => {
    if (option) {
      const value = {
        value: option?.value,
        label: option?.value,
      }
      setData([value])
      mutate(
        { mxik_code: option?.value },
        {
          onSuccess: () => {
            handleUpdateRow({ mxik_code: String(option?.value) }, id)
          },
        },
      )
      setOption(value)
    } else {
      setOption(null)
      setMxikCode(null)
      const values = { mxik_code: null, unit_code: null, package_code: null }
      mutate(values, {
        onSuccess: () => {
          handleUpdateRow(values, id)
        },
      })
    }
    setSearch('')
  }
  return { data, option, search, isLoading, handleChange, handleInputChange }
}
