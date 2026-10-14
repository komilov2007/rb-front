import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getAutoResponder, changeAutoResponder } from '@/apis/admin/order'

export const useAutoResponder = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isLoading } = useQuery({
    queryFn: getAutoResponder,
    queryKey: [REACT_QUERY_KEYS.ORDER_AUTO_RESPONDER],
    select: res => {
      const data = res.data.notifications
      const values = {
        accept_en: data.NEW.en,
        accept_ru: data.NEW.ru,
        accept_uz: data.NEW.uz,
        accept_tr: data.NEW.tr,
        cancel_en: data.CANCEL.en,
        cancel_ru: data.CANCEL.ru,
        cancel_uz: data.CANCEL.uz,
        cancel_tr: data.CANCEL.tr,
        delivered_en: data.DELIVERED.en,
        delivered_ru: data.DELIVERED.ru,
        delivered_uz: data.DELIVERED.uz,
        delivered_tr: data.DELIVERED.tr,
        on_th_way_en: data.ON_THE_WAY.en,
        on_th_way_ru: data.ON_THE_WAY.ru,
        on_th_way_uz: data.ON_THE_WAY.uz,
        on_th_way_tr: data.ON_THE_WAY.tr,
        payed_en: data.COMPLETED.en,
        payed_ru: data.COMPLETED.ru,
        payed_uz: data.COMPLETED.uz,
        payed_tr: data.COMPLETED.tr,
        progress_en: data.PROGRESS.en,
        progress_ru: data.PROGRESS.ru,
        progress_uz: data.PROGRESS.uz,
        progress_tr: data.PROGRESS.tr,
        ready_en: data.READY.en,
        ready_ru: data.READY.ru,
        ready_uz: data.READY.uz,
        ready_tr: data.READY.tr,
      }
      return { ...res, data: { ...res.data, values } }
    },
    onSuccess: res => {
      form.reset(res.data.values)
    },
  })

  const form = useForm<SchemaType>({
    defaultValues: schema.cast({}),
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const notifications = {
        CANCEL: {
          en: data.cancel_en,
          ru: data.cancel_ru,
          uz: data.cancel_uz,
          tr: data.cancel_tr,
        },
        COMPLETED: {
          en: data.payed_en,
          ru: data.payed_ru,
          uz: data.payed_uz,
          tr: data.payed_tr,
        },
        DELIVERED: {
          en: data.delivered_en,
          ru: data.delivered_ru,
          uz: data.delivered_uz,
          tr: data.delivered_tr,
        },
        NEW: {
          en: data.accept_en,
          ru: data.accept_ru,
          uz: data.accept_uz,
          tr: data.accept_tr,
        },
        ON_THE_WAY: {
          en: data.on_th_way_en,
          ru: data.on_th_way_ru,
          uz: data.on_th_way_uz,
          tr: data.on_th_way_tr,
        },
        PROGRESS: {
          en: data.progress_en,
          ru: data.progress_ru,
          uz: data.progress_uz,
          tr: data.progress_tr,
        },
        READY: {
          en: data.ready_en,
          ru: data.ready_ru,
          uz: data.ready_uz,
          tr: data.ready_tr,
        },
      }
      return await changeAutoResponder({ notifications })
    },
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      navigate(`${ROUTER.ADMIN}/${ROUTER.ORDERS}`)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, isLoading, onSubmit, updateIsLoading }
}
