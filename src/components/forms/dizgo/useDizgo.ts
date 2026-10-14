import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration, getAppDetail } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDizgo, installDizgo, uploadDizgo } from '@/apis/admin/dizgo'
import { schemaDizgo, type SchemaTypeDizgo } from './form.schema'
import { useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'

export interface DizgoProps {
  onClose: () => void
}

export const useDizgo = (props: DizgoProps) => {
  const { roboMarketAppId } = useParams<ParamProps>()
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeDizgo>({
    mode: 'onChange',
    resolver: yupResolver(schemaDizgo),
    defaultValues: schemaDizgo.cast({}, { assert: false }),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: uploadDizgo,
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

  const dizgo = useMutation({
    mutationFn: async (data: SchemaTypeDizgo) => {
      return await installDizgo({ username: data.username, password: data.password })
    },
    onSuccess: () => {
      props.onClose()
      upload.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.DIZGO_DETAIL])
    },
  })

  const roboMarket = useQuery({
    queryKey: [REACT_QUERY_KEYS.BRANCH_LIST, roboMarketAppId],
    queryFn: async () => await getAppDetail(String(roboMarketAppId)),
  })

  const dizgoData = useQuery({
    queryKey: [REACT_QUERY_KEYS.DIZGO_DETAIL],
    queryFn: getDizgo,
    onSuccess: res => {
      if (res.data.dizgo.username) {
        form.setValue('username', res.data.dizgo.username)
        form.setValue('password', res.data.dizgo.password)
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('dizgo'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.DIZGO_DETAIL])
      form.reset(schemaDizgo.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const onSubmit = (data: SchemaTypeDizgo) => {
    dizgo.mutate(data)
  }

  const handleClick = () => {
    mutate()
  }

  return {
    form,
    dizgoData,
    dizgo,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
    roboMarket,
  }
}
