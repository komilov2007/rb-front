import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaClopos, type SchemaTypeClopos } from '@/utils/schema'
import { getCloposCreds, importClopos, postCloposCreds } from '@/apis/admin/clopos'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useFormClopos = () => {
  const modal = useBoolean()
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeClopos>({
    mode: 'onChange',
    resolver: yupResolver(schemaClopos),
    defaultValues: schemaClopos.cast({}, { assert: false }),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: importClopos,
    onSuccess: () => {
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const poster = useMutation({
    mutationFn: async ({ client_secret, client_id, brand, ...data }: SchemaTypeClopos) => {
      const branches = data.branches
        .filter(b => b.checked)
        .map(b => ({
          spot_id: b.spot_id,
          latitude: b.latitude,
          longitude: b.longitude,
          spot_name: b.spot_name,
        }))

      return await postCloposCreds({ branches, client_secret, client_id, brand })
    },
    onSuccess: () => {
      modal.setFalse()
      upload.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.CLOPOS_DETAIL])
    },
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.CLOPOS_DETAIL],
    queryFn: getCloposCreds,
    onSuccess: res => {
      form.reset(res.data.clopos)
    },
  })

  const hasToken = !!token.data?.data.clopos?.client_secret

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('clopos'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.CLOPOS_DETAIL])
      form.reset(schemaClopos.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const onSubmit = (data: SchemaTypeClopos) => {
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
