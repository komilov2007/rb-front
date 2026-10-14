import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { schemaIiko, type SchemaTypeIiko } from '@/utils/schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sendToken, getIikoToken, uploadIiko, deleteIiko } from '@/apis/admin/iiko'

export interface IikoProps {
  handleUpdate: () => void
}

export const useIiko = (props: IikoProps) => {
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaTypeIiko>({
    mode: 'onChange',
    resolver: yupResolver(schemaIiko),
    defaultValues: schemaIiko.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadIiko,
    onSuccess: () => {
      props.handleUpdate()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
    onError: (err: ErrorProps) => {
      if (err.response?.data?.code === 30001) {
        upload.setTrue()
      }
    },
  })

  const secretToken = useMutation({
    mutationFn: async (data: SchemaTypeIiko) => {
      const branches = data.branches
        .filter(b => b.checked)
        .map(b => ({
          spot_id: b.spot_id,
          latitude: b.latitude,
          longitude: b.longitude,
          spot_name: b.spot_name,
          terminal_id: b.terminal_id,
        }))

      return await sendToken({
        branches,
        api_login: data.api_login,
      })
    },
    onSuccess: () => {
      upload.setFalse()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.IIKO_TOKEN])
    },
  })

  const token = useQuery({
    queryFn: getIikoToken,
    queryKey: [REACT_QUERY_KEYS.IIKO_TOKEN],
    onSuccess: res => {
      form.reset(res.data.iiko)
    },
  })

  const deleteMutationIiko = useMutation({
    mutationFn: deleteIiko,
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.IIKO_TOKEN])
      form.reset(schemaIiko.cast({}, { assert: false }))
    },
  })

  const onSubmit = (data: SchemaTypeIiko) => {
    secretToken.mutate(data)
  }

  const handleClick = () => {
    mutate()
  }

  const handleDelete = () => {
    deleteMutationIiko.mutate()
  }

  return {
    form,
    token,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    secretToken,
    handleDelete,
    deleteMutationIiko,
  }
}
