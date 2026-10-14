import { useForm } from 'react-hook-form'
import { useWebsite } from '@/hooks/useWebsite'
import { useOutletContext } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { type SignUpWebsiteProps } from '@/types/sign-up'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { mixed, object, string, type InferType } from 'yup'

export const schema = object().shape({
  title: string().nullable().default(null),
  favicon: mixed().nullable().default(null),
  description: string().nullable().default(null),
})

export type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const { title, favicon, description, ...values } = useOutletContext<SignUpWebsiteProps>()
  const { mutate, isLoading } = useWebsite()
  const data = {
    title,
    favicon,
    description,
  }

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast(data),
  })

  const onSubmit = async (data: SchemaType) => {
    const favicon =
      typeof data.favicon === 'string'
        ? await getFileFromLink(data.favicon)
        : (data.favicon as unknown as File)

    const formData = new FormData()
    for (const [key, value] of Object.entries(values)) {
      if (value != null) {
        formData.append(key, value as string)
      }
    }
    if (data.favicon) {
      formData.append('favicon', favicon)
    }
    if (data.description != null) {
      formData.append('description', data.description)
    }
    if (data.title != null) {
      formData.append('title', data.title)
    }

    mutate(formData)
  }

  const handleCancel = () => {
    form.reset(data)
  }

  return { form, values, onSubmit, isLoading, handleCancel }
}
