import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { phoneFormat } from '@/utils/phone'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { useProfileStore } from '@/store/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type RoleListProps, type EmployeeListProps } from '@/types/role'
import { createEmployee, getDetailEmployee, updateEmployee } from '@/apis/admin/role'

export interface FormEmployeeProps {
  id?: number
  count?: number
  data: RoleListProps[]
  variant: 'add' | 'edit'
  handleUpdate: (data: EmployeeListProps) => void
}

export const useFormEmployee = ({ id, variant, count = 0, handleUpdate }: FormEmployeeProps) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const defaultValues = { ...schema.cast({}, { assert: false }), variant }
  const form = useForm<SchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const {
    data,
    isFetching,
    isLoading: isLoadingDetail,
  } = useQuery({
    enabled: value && variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.ROLE_EMPLOYEE_DETAIL, id],
    queryFn: async () => await getDetailEmployee(Number(id)),
    onSuccess: res => {
      form.reset({
        role: res.data.role.id,
        firstname: res.data.user.firstname,
        phone: res.data.user.phone?.length > 0 ? res.data.user.phone.replace('+998', '') : '',
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const values = {
        role: data.role,
        user: {
          password: data.password,
          firstname: data.firstname,
          phone: phoneFormat(data.phone),
          confirm_password: data.confirm_password,
        },
      }

      if (variant === 'edit') {
        const values = {
          role: data.role,
          user: {
            firstname: data.firstname,
            phone: phoneFormat(data.phone),
          },
        }

        return await updateEmployee(values, String(id))
      }

      return await createEmployee(values)
    },
    onSuccess: res => {
      setFalse()
      handleUpdate(res.data)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
    onError: (error: ErrorProps) => {
      if (error.response?.data.errors) {
        error.response?.data.errors.forEach(err => {
          if (err.field === 'phone') {
            form.setError('phone', {
              type: 'manual',
              message: err.message,
            })
          }
        })
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen =
      (tariff === 'START' && count < 1) || (tariff === 'BASIC' && count < 5) || tariff === 'PRO'
    const startTextObj = {
      title: t('You_are_on_the_Start_plan'),
      description: t(
        'If_you_want_to_add_more_than_1_employee_upgrad_t_th_Basi_o_Pr_pla_an_expan_your_team',
      ),
    }
    const basicTextObj = {
      title: t('You_are_on_the_Basic_plan'),
      description: t(
        'If_you_want_to_add_more_than_5_employee_upgrad_t_th_o_Pro_pla_an_expan_your_team',
      ),
    }

    canOpen
      ? setTrue()
      : setSubscriptionModal(true, tariff === 'START' ? startTextObj : basicTextObj)
  }

  return {
    data,
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isFetching,
    handleOpen,
    isLoadingDetail,
  }
}
