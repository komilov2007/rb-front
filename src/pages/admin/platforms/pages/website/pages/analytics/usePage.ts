import { useForm } from 'react-hook-form'
import { useWebsite } from '@/hooks/useWebsite'
import { useOutletContext } from 'react-router-dom'
import { type InferType, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type SignUpWebsiteProps } from '@/types/sign-up'
import { getFileFromLink } from '@/utils/get-file-from-link'

export const schema = object().shape({
  google: string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .default(null),
  yandex: string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .default(null),
  facebook: string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .default(null),
  google_tag: string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .default(null),
})

export type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const { mutate, isLoading } = useWebsite()
  const { favicon, google, yandex, facebook, google_tag, ...values } =
    useOutletContext<SignUpWebsiteProps>()
  const data = {
    google,
    yandex,
    facebook,
    google_tag,
  }

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast(data),
  })

  const onSubmit = async (data: SchemaType) => {
    const favIcon =
      typeof favicon === 'string' ? await getFileFromLink(favicon) : (favicon as unknown as File)

    const formData = new FormData()
    for (const [key, value] of Object.entries(values)) {
      if (value != null) {
        formData.append(key, value as string)
      }
    }
    for (const [key, value] of Object.entries(data)) {
      if (value != null) {
        formData.append(key, value)
      }
    }
    if (favicon) {
      formData.append('favicon', favIcon)
    }

    mutate(formData)
  }

  const handleCancel = () => {
    form.reset(data)
  }

  return { form, onSubmit, isLoading, handleCancel }
}
