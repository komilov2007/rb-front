import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaZoomrad, type SchemaTypeZoomrad } from '@/utils/schema'
import { getZoomradCreds, postZoomradCreds } from '@/apis/admin/zoomrad'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useFormZoomrad = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeZoomrad>({
    mode: 'onChange',
    resolver: yupResolver(schemaZoomrad),
    defaultValues: schemaZoomrad.cast({}, { assert: false }),
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.ZOOMRAD_DETAIL],
    queryFn: getZoomradCreds,
    onSuccess: res => {
      if (res.data?.zoomrad) {
        form.reset(schemaZoomrad.cast(res.data.zoomrad, { assert: false }))
      }
    },
  })

  const hasToken = !!token.data?.data?.zoomrad?.client_id

  const saveMutation = useMutation({
    mutationFn: postZoomradCreds,
    onSuccess: () => {
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ZOOMRAD_DETAIL])
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('zoomrad'),
    onSuccess: () => {
      modal.setFalse()
      form.reset(schemaZoomrad.cast({}, { assert: false }))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ZOOMRAD_DETAIL])
    },
  })

  const onSubmit = (data: SchemaTypeZoomrad) => {
    saveMutation.mutate(data)
  }

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  return {
    t,
    form,
    modal,
    token,
    hasToken,
    onSubmit,
    handleDelete,
    saveMutation,
    deleteMutation,
  }
}
