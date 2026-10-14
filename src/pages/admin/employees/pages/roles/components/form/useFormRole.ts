import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { type ChangeEvent, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type RoleListProps, type MenuRoleProps } from '@/types/role'
import { createRole, getDetailRole, updateRole } from '@/apis/admin/role'

export interface FormRoleProps {
  id?: number
  count?: number
  data: MenuRoleProps
  variant: 'add' | 'edit'
  handleUpdate: (data: RoleListProps) => void
}

export const useFormRole = ({ id, data, count = 0, variant, handleUpdate }: FormRoleProps) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const [values, setValues] = useState({
    allView: false,
    allEdit: false,
    allDelete: false,
    oneView: false,
    oneEdit: false,
    oneDelete: false,
  })
  const menu_permissions = data.map(({ id, ...p }) => ({
    ...p,
    menu: id,
    can_view: false,
    can_edit: false,
    can_delete: false,
  }))
  const defaultValues = {
    name: '',
    menu_permissions,
  }
  const form = useForm<SchemaType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const { fields, replace } = useFieldArray({
    name: 'menu_permissions',
    control: form.control,
  })
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(defaultValues)
    },
  })

  const {
    isFetching,
    data: dataDetail,
    isLoading: isLoadingDetail,
  } = useQuery({
    enabled: value && variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.ROLE_DETAIL, id],
    queryFn: async () => await getDetailRole(Number(id)),
    onSuccess: res => {
      form.reset({
        name: res.data.name,
        menu_permissions: menu_permissions.map(p => {
          const permissions = res.data.menu_permissions.find(m => m.menu === p.menu)
          return {
            ...p,
            ...permissions,
          }
        }),
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const values = {
        ...data,
        menu_permissions: data.menu_permissions.map(({ name, slug, ...p }) => p),
      }
      if (variant === 'edit') {
        return await updateRole(data, String(id))
      }

      return await createRole(values)
    },
    onSuccess: res => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate(res.data)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const permissions = form.watch('menu_permissions')
    const filteredPermissionsView = permissions.map(m => m.can_view).filter(m => m)

    if (event.target.name === 'view') {
      if (values?.oneView) {
        const editPermissions = permissions.map(m => ({
          ...m,
          can_view: false,
          can_edit: false,
          can_delete: false,
        }))
        replace(editPermissions)
        setValues({ ...values, allView: false, oneView: false })
      } else {
        if (filteredPermissionsView.length === fields.length) {
          setValues({ ...values, allView: false, oneView: false })
          const editPermissions = permissions.map(m => ({
            ...m,
            can_view: false,
            can_edit: false,
            can_delete: false,
          }))
          replace(editPermissions)
        } else {
          const editPermissions = permissions.map(m => ({ ...m, can_view: true }))
          replace(editPermissions)
          setValues({ ...values, allView: true, oneView: false })
        }
      }
    }
    if (event.target.name === 'edit') {
      if (values?.oneView) {
        const editPermissions = permissions.map(m => ({ ...m, can_edit: false }))
        replace(editPermissions)
        setValues({ ...values, allEdit: false, oneEdit: false })
      } else {
        const filteredPermissions = permissions.map(m => m.can_edit).filter(m => m)
        if (filteredPermissions.length === fields.length) {
          setValues({ ...values, allEdit: false, oneEdit: false })
          const editPermissions = permissions.map(m => ({ ...m, can_edit: false }))
          replace(editPermissions)
        } else {
          const editPermissions = permissions.map(m => ({ ...m, can_edit: true }))
          replace(editPermissions)
          setValues({ ...values, allEdit: true, oneEdit: false })
        }
      }
    }
    if (event.target.name === 'delete') {
      if (values?.oneView) {
        const editPermissions = permissions.map(m => ({ ...m, can_delete: false }))
        replace(editPermissions)
        setValues({ ...values, allDelete: false, oneDelete: false })
      } else {
        const filteredPermissions = permissions.map(m => m.can_delete).filter(m => m)
        if (filteredPermissions.length === fields.length) {
          setValues({ ...values, allDelete: false, oneDelete: false })
          const editPermissions = permissions.map(m => ({ ...m, can_delete: false }))
          replace(editPermissions)
        } else {
          const editPermissions = permissions.map(m => ({ ...m, can_delete: true }))
          replace(editPermissions)
          setValues({ ...values, allDelete: true, oneDelete: false })
        }
      }
    }
  }

  const handleChangeUpdate =
    (type: 'view' | 'edit' | 'delete', index: number) =>
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const permissions = form.watch('menu_permissions')

      if (type === 'view') {
        const filteredPermissions = permissions.map(m => m.can_view).filter(m => m)
        if (filteredPermissions.length === 1 && !checked) {
          setValues({ ...values, allView: false, oneView: false })
        } else if (filteredPermissions.length === fields.length - 1 && checked) {
          setValues({ ...values, allView: true, oneView: false })
        } else {
          setValues({ ...values, oneView: true })
        }
        if (!checked) {
          form.setValue(`menu_permissions.${index}.can_edit`, false)
          form.setValue(`menu_permissions.${index}.can_delete`, false)
        }
      }
      if (type === 'edit') {
        const filteredPermissions = permissions.map(m => m.can_edit).filter(m => m)
        if (filteredPermissions.length === 1 && !checked) {
          setValues({ ...values, allEdit: false, oneEdit: false })
        } else if (filteredPermissions.length === fields.length - 1 && checked) {
          setValues({ ...values, allEdit: true, oneEdit: false })
        } else {
          setValues({ ...values, oneEdit: true })
        }
      }
      if (type === 'delete') {
        const filteredPermissions = permissions.map(m => m.can_delete).filter(m => m)
        if (filteredPermissions.length === 1 && !checked) {
          setValues({ ...values, allDelete: false, oneDelete: false })
        } else if (filteredPermissions.length === fields.length - 1 && checked) {
          setValues({ ...values, allDelete: true, oneDelete: false })
        } else {
          setValues({ ...values, oneDelete: true })
        }
      }
    }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen = (tariff === 'BASIC' && count < 5) || tariff === 'PRO'

    canOpen ? setTrue() : setSubscriptionModal(true)
  }

  return {
    form,
    value,
    fields,
    values,
    setTrue,
    setFalse,
    onSubmit,
    setValues,
    isLoading,
    handleOpen,
    dataDetail,
    isFetching,
    handleChange,
    isLoadingDetail,
    handleChangeUpdate,
  }
}
