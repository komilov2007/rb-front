import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration, getAppDetail } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getERAStores, getERA, installERA, uploadERA } from '@/apis/admin/era'
import { schemaERA, type SchemaTypeERA } from './form.schema'
import { useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'

export interface ERAProps {
  onClose: () => void
}

export const useERA = (props: ERAProps) => {
  const { roboMarketAppId } = useParams<ParamProps>()
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeERA>({
    mode: 'onChange',
    resolver: yupResolver(schemaERA),
    defaultValues: schemaERA.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadERA,
    onSuccess: () => {
      props.onClose()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
    onError: (err: ErrorProps) => {
      if (err.response?.data?.code === 30001) {
        upload.setTrue()
      }
    },
  })

  const era = useMutation({
    mutationFn: async (data: SchemaTypeERA) => {
      return await installERA(data)
    },
    onSuccess: () => {
      props.onClose()
      upload.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ERA_DETAIL])
    },
  })

  const roboMarket = useQuery({
    queryKey: [REACT_QUERY_KEYS.BRANCH_LIST, roboMarketAppId],
    queryFn: async () => await getAppDetail(String(roboMarketAppId)),
  })

  const username = form.watch('username')
  const password = form.watch('password')

  const eraStoresData = useQuery({
    queryKey: [REACT_QUERY_KEYS.ERA_STORES_DETAIL, username, password],
    queryFn: async () => await getERAStores({ username, password }),
    onSuccess: res => {
      if (res.data?.[0]) {
        form.setValue('store_id', res.data?.[0].id)
      }
    },
    enabled: !!username && !!password,
  })

  const eraData = useQuery({
    queryKey: [REACT_QUERY_KEYS.ERA_DETAIL],
    queryFn: getERA,
    onSuccess: res => {
      if (res.data?.era?.username) {
        form.setValue('username', res.data.era.username)
        form.setValue('password', res.data.era.password)
        form.setValue('store_id', res.data.era.store_id)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('era'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ERA_DETAIL])
      form.reset(schemaERA.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const onSubmit = (data: SchemaTypeERA) => {
    era.mutate(data)
  }

  const handleClick = () => {
    mutate()
  }

  return {
    form,
    eraData,
    era,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
    roboMarket,
    eraStoresData,
  }
}
