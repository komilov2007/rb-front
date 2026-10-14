import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaPoster, type SchemaTypePoster } from '@/utils/schema'
import { getPoster, installPoster, uploadPoster } from '@/apis/admin/poster'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface PosterProps {
  onClose: () => void
}

export const usePoster = (props: PosterProps) => {
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypePoster>({
    mode: 'onChange',
    resolver: yupResolver(schemaPoster),
    defaultValues: schemaPoster.cast({}, { assert: false }),
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: uploadPoster,
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

  const poster = useMutation({
    mutationFn: async (data: SchemaTypePoster) => {
      const branches = data.branches
        .filter(b => b.checked)
        .map(b => ({
          spot_id: b.spot_id,
          latitude: b.latitude,
          longitude: b.longitude,
          spot_name: b.spot_name,
        }))

      return await installPoster({ token: data.token, branches, source_id: data.source_id })
    },
    onSuccess: () => {
      props.onClose()
      upload.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.POSTER_DETAIL])
    },
  })

  const token = useQuery({
    queryKey: [REACT_QUERY_KEYS.POSTER_DETAIL],
    queryFn: getPoster,
    onSuccess: res => {
      form.setValue('token', res.data.poster.token)
      if (res.data.poster.source_id) {
        form.setValue('source_id', String(res.data.poster.source_id))
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteIntegration('poster'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.POSTER_DETAIL])
      form.reset(schemaPoster.cast({}, { assert: false }))
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const onSubmit = (data: SchemaTypePoster) => {
    poster.mutate(data)
  }

  const handleClick = () => {
    mutate()
  }

  return {
    form,
    token,
    poster,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
  }
}
