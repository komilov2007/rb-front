import { useForm } from 'react-hook-form'
import { phoneFormat } from '@/utils/phone'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { profileVerify, updateEmail, updatePhone, updateProfile } from '@/apis/admin/profile'

export const usePage = () => {
  const { setProfile, ...defaultValues } = useProfileStore(state => ({
    email: state.email,
    phone: state.phone.replace('+998', ''),
    photo: state.photo,
    firstname: state.firstname,
    setProfile: state.setProfile,
  }))
  const form = useForm<SchemaType>({
    defaultValues: { ...defaultValues, isVerify: false },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const photo =
        typeof data.photo === 'string' ? await getFileFromLink(data.photo) : (data.photo as File)

      const formData = new FormData()
      if (photo) {
        formData.append('photo', photo)
      }
      if (data.phone.length > 0) {
        formData.append('phone', phoneFormat(data.phone))
      }
      if (data?.email && data?.email?.length > 0) {
        formData.append('email', data?.email)
      }
      formData.append('firstname', data.firstname)
      return await updateProfile(formData)
    },
    onSuccess: res => {
      setProfile(res.data)
    },
  })

  const email = useMutation({
    mutationFn: async (data: Pick<SchemaType, 'email'>) => {
      return await updateEmail(data)
    },
    onSuccess: () => {
      form.setValue('isVerify', true)
    },
  })

  const phone = useMutation({
    mutationFn: async (data: Pick<SchemaType, 'phone'>) => {
      return await updatePhone(data)
    },
    onSuccess: () => {
      form.setValue('isVerify', true)
    },
  })

  const verify = useMutation({
    mutationFn: async (name: 'email' | 'phone') =>
      await profileVerify({ code: form.getValues('code'), [name]: form.getValues(name) }),
    onSuccess: () => {
      email.reset()
      phone.reset()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleCancel = () => {
    form.reset(defaultValues)
  }

  const handleUpdateEmail = () => {
    email.mutate({ email: form.getValues('email') })
  }
  const handleUpdatePhone = () => {
    phone.mutate({ phone: phoneFormat(form.getValues('phone')) })
  }

  const handleVerify = (name: 'email' | 'phone') => () => {
    verify.mutate(name)
  }

  return {
    form,
    email,
    phone,
    verify,
    onSubmit,
    isLoading,
    handleVerify,
    handleCancel,
    defaultValues,
    handleUpdateEmail,
    handleUpdatePhone,
  }
}
