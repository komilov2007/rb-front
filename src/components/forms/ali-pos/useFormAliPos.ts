import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaAliPos, type SchemaTypeAliPos } from '@/utils/schema'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAliposCreds, importAliPos, postAliPosCreds } from '@/apis/admin/ali-pos'

export const useFormAliPos = () => {
  const modal = useBoolean()
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeAliPos>({
    mode: 'onChange',
    resolver: yupResolver(schemaAliPos),
    defaultValues: schemaAliPos.cast({}, { assert: false }),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: importAliPos,
    onSuccess: () => {
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const poster = useMutation({
    mutationFn: async ({ client_secret, client_id, ...data }: SchemaTypeAliPos) => {
      const branches = data.branches
        .filter(b => b.checked)
        .map(b => ({
          spot_id: b.spot_id,
          latitude: b.latitude,
          longitude: b.longitude,
          spot_name: b.spot_name,
        }))

      return await postAliPosCreds({ branches, client_secret, client_id })
    },
    onSuccess: () => {
      modal.setFalse()
      upload.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ALI_POS_DETAIL])
    },
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.ALI_POS_DETAIL],
    queryFn: getAliposCreds,
    onSuccess: res => {
      form.reset(res.data.alipos)
    },
  })

  const hasToken = !!token.data?.data.alipos?.client_secret

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('clopos'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ALI_POS_DETAIL])
      form.reset(schemaAliPos.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const onSubmit = (data: SchemaTypeAliPos) => {
    poster.mutate(data)
  }

  const handleClick = () => {
    mutate()
  }

  return {
    modal,
    form,
    token,
    poster,
    upload,
    hasToken,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
  }
}
