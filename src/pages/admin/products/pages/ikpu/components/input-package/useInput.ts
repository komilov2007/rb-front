import { toast } from 'react-toastify'
import type { IkpuProps } from '@/types/ikpu'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useState, type SyntheticEvent } from 'react'
import { getPackage, updateIkpu } from '@/apis/admin/ikpu'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface OptionProps {
  label: string
  value: string
  unit?: number
}

export interface InputProps {
  id: number
  value: string | null
  mxik_code: string | null
  handleUpdateRow: (values: Partial<IkpuProps>, id: number) => void
}

export const useInput = ({ id, value, mxik_code, handleUpdateRow }: InputProps) => {
  const { t } = useTranslation()
  const loader = useBoolean()
  const [packageCode, setPackageCode] = useState(value)
  const optionValue = value ? { label: value, value } : null
  const [option, setOption] = useState<OptionProps | null>(optionValue)
  const [data, setData] = useState<OptionProps[]>([])

  const { refetch } = useQuery({
    enabled: false,
    queryKey: [REACT_QUERY_KEYS.IKPU_PACKAGE_LIST, mxik_code],
    queryFn: async () => await getPackage(mxik_code),
    select: res => {
      const data = res.data.map(t => ({
        label: t.name ?? '',
        unit: t.unit_code ?? null,
        value: t.package_code ?? '',
      }))
      return { ...res, data }
    },
    onSuccess: res => {
      loader.setFalse()
      if (packageCode) {
        const findOption = res.data.find(v => v.value !== packageCode)
        const option = findOption ? { ...findOption, label: findOption.value } : null
        setOption(option)
      }
      setData(res.data)
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (data: Partial<IkpuProps>) => await updateIkpu(data, id),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handlClick = () => {
    if (mxik_code) {
      void refetch()
      loader.setTrue()
    }
  }

  const handleChange = (_: SyntheticEvent, option: OptionProps | null) => {
    if (option) {
      const value = {
        value: String(option?.value),
        label: String(option?.value),
      }
      setOption(value)
      mutate(
        {
          unit_code: String(option?.unit),
          package_code: value.value,
        },
        {
          onSuccess: () => {
            handleUpdateRow(
              { unit_code: String(option?.unit), package_code: String(value.value) },
              id,
            )
          },
        },
      )
    } else {
      setOption(null)
      setPackageCode(null)
      const values = { unit_code: null, package_code: null }
      mutate(values, {
        onSuccess: () => {
          handleUpdateRow(values, id)
        },
      })
    }
  }

  return { data, option, loader, handleChange, handlClick }
}
