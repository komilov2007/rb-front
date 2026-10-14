import dayjs from 'dayjs'
import { useEffect, useRef, type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { object, type InferType } from 'yup'
import { type NameProps } from '@/types/name'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { defaultLanguages } from '@/utils/languages'
import { yupResolver } from '@hookform/resolvers/yup'
import { type LanguageTypes } from '@/types/language'
import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DEFAULT_WORKING_TIMES } from '@/constants/schedules'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { BranchProps, ServiceProps } from '@/types/branch'
import { DELIVERY_OPTIONS, DELIVERY_TYPES } from '@/constants/delivery'
import { mapSchema, nameSchema, serviceSchema, schemaSchedules } from '@/utils/schema'
import { createBranch, getBranchDetail, updateBranch } from '@/apis/admin/branch'

const schema = object()
  .concat(mapSchema)
  .concat(nameSchema())
  .concat(serviceSchema)
  .concat(schemaSchedules)

const buildSchedulesFromWorkingTime = (
  workingTime?: Record<
    number,
    { hours: Array<{ open: string; close: string }>; is_closed: boolean }
  >,
) => {
  const entries =
    workingTime && Object.keys(workingTime).length > 0
      ? Object.entries(workingTime)
      : Object.entries(DEFAULT_WORKING_TIMES)

  return entries.map(([key, values]) => {
    const hours = values.hours.map(h => ({
      open: h.open
        ? `${dayjs().format('YYYY-MM-DD')} ${h.open}`
        : dayjs().format('YYYY-MM-DD 00:00:00'),
      close: h.open
        ? `${dayjs().format('YYYY-MM-DD')} ${h.close}`
        : dayjs().format('YYYY-MM-DD 23:59:59'),
    }))
    return {
      hours,
      day: Number(key),
      is_closed: !values.is_closed,
    }
  })
}

type SchemaType = InferType<typeof schema>

type PanelsProps = Array<{
  label: string
  name: NameProps
  value: LanguageTypes
}>

export interface FormBranchProps {
  id?: number
  count?: number
  type?: ServiceProps
  variant: 'edit' | 'add' | 'create'
  handleUpdate: (data: BranchProps) => void
}

export const useFormBranch = ({ id, type, count = 0, variant, handleUpdate }: FormBranchProps) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const serviceRef = useRef<HTMLDivElement | null>(null)
  const defaultValues =
    variant === 'create'
      ? {
          ...schema.cast({}),
          schedules: buildSchedulesFromWorkingTime(),
          service: [
            { ...DELIVERY_TYPES.DELIVERY, checked: type === 'DELIVERY' },
            { ...DELIVERY_TYPES.PICKUP, checked: type === 'PICKUP' },
          ],
        }
      : { ...schema.cast({}), schedules: buildSchedulesFromWorkingTime() }

  const form = useForm<SchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(defaultValues)
    },
  })

  const detail = useQuery({
    enabled: value && variant === 'edit',
    queryFn: async () => await getBranchDetail(id),
    queryKey: [REACT_QUERY_KEYS.BRANCH_DETAIL, id],
    onSuccess: res => {
      const data = res.data
      const service = DELIVERY_OPTIONS.map(d => ({
        ...d,
        checked: data.service.includes(d.type),
      }))
      const values = {
        service,
        name_en: data.name_en,
        name_ru: data.name_ru,
        name_uz: data.name_uz,
        name_tr: data.name_tr,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        schedules: buildSchedulesFromWorkingTime(data.working_time),
      }
      form.reset(values)
    },
  })

  const { fields } = useFieldArray({
    name: 'service',
    control: form.control,
  })

  const handleChange = (values: SchemaType) => {
    const names = defaultLanguages(
      'name',
      {
        name_en: values.name_en,
        name_ru: values.name_ru,
        name_uz: values.name_uz,
        name_tr: values.name_tr,
      },
      true,
    )
    const service = values.service.filter(s => s.checked).map(s => s.type)
    const working_time = values.schedules.reduce((prev, next) => {
      const hours = next.hours?.map(h => ({
        open: dayjs(h.open).isValid() ? dayjs(h.open).format('HH:mm:00') : '00:00:00',
        close: dayjs(h.close).isValid() ? dayjs(h.close).format('HH:mm:00') : '23:59:59',
      }))
      return {
        ...prev,
        [next.day]: {
          hours,
          is_closed: !next.is_closed,
        },
      }
    }, {})

    return { ...values, ...names, service, working_time }
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: SchemaType) => {
      if (variant === 'edit') {
        return await updateBranch(handleChange(values), String(id))
      }
      return await createBranch(handleChange(values))
    },
    onSuccess: res => {
      handleUpdate(res.data)
      toast.success(t('the_action_has_successfully_been_completed'))
      setFalse()
    },
  })

  const handleSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    void form.handleSubmit(handleSubmit)(e)
  }

  useEffect(() => {
    const hasError = !!form.formState.errors.service?.root
    if (form.formState.isSubmitted && hasError) {
      requestAnimationFrame(() => {
        if (serviceRef.current) {
          serviceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }
    // re-run when submission state or errors change
  }, [form.formState.isSubmitted, form.formState.errors.service?.root])

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'name_uz',
      label: `${t('branch_name')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'name_ru',
      label: `${t('branch_name')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'name_en',
      label: `${t('branch_name')} (English)`,
    },
    {
      value: 'tr',
      name: 'name_tr',
      label: `${t('branch_name')} (Türkçe)`,
    },
  ]

  const handleOpen = () => {
    const { tariff } = subscription || {}

    const canOpen =
      (tariff === 'START' && count < 1) || (tariff === 'BASIC' && count < 5) || tariff === 'PRO'

    const startTextObj = {
      title: t('You_are_currently_on_the_Start_plan_which_allows_adding_only_one_branch'),
      description: t('Upgrade_to_Basic_or_Pro_to_add_more_branches_and_scale_your_business'),
    }
    const basicTextObj = {
      title: t('You_are_currently_on_the_Basic_plan_which_allows_adding_only_one_branch'),
      description: t('Upgrade_to_Pro_to_add_more_branches_and_scale_your_business'),
    }

    if (canOpen) {
      setTrue()
    } else {
      setSubscriptionModal(true, tariff === 'START' ? startTextObj : basicTextObj)
    }
  }

  return {
    form,
    value,
    fields,
    panels,
    detail,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
    serviceRef,
  }
}
