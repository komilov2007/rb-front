import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { deleteIntegration } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getBillzToken, sendToken, uploadBillz } from '@/apis/admin/billz'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export interface BillzProps {
  handleUpdate: () => void
}

export const useBillz = (props: BillzProps) => {
  const upload = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadBillz,
    onSuccess: () => {
      props.handleUpdate()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BILLZ_TOKEN])
      toast.success(t('the_action_has_successfully_been_completed'))
    },
    onError: (err: ErrorProps) => {
      if (err.response?.data?.code === 30001) {
        upload.setTrue()
      }
    },
  })

  const secretToken = useMutation({
    mutationFn: async (data: SchemaType) => await sendToken({ billz: data }),
    onSuccess: () => {
      upload.setFalse()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BILLZ_TOKEN])
    },
  })

  const deleteMutationBillz = useMutation({
    mutationFn: async () => await deleteIntegration('billz'),
    onSuccess: () => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BILLZ_TOKEN])
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const token = useQuery({
    queryFn: getBillzToken,
    queryKey: [REACT_QUERY_KEYS.BILLZ_TOKEN],
    onSuccess: res => {
      form.reset(res.data.billz)
    },
  })

  const onSubmit = (data: SchemaType) => {
    secretToken.mutate(data)
  }
  const handleClick = () => {
    mutate()
  }

  const handleDelete = () => {
    deleteMutationBillz.mutate()
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
    deleteMutationBillz,
  }
}
