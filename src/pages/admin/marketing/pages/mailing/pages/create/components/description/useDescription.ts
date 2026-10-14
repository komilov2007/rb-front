import { useMarketingStore } from '@/store/marketing'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import { schemaCreateMailing, type SchemaTypeCreateMailing } from '@/utils/schema'

export const useDescription = () => {
  const form = useForm<SchemaTypeCreateMailing>({
    mode: 'onChange',
    resolver: yupResolver(schemaCreateMailing),
    defaultValues: schemaCreateMailing.cast({}),
  })
  const { setStep, setDescription } = useMarketingStore(state => ({
    setStep: state.setStep,
    setDescription: state.setDescription,
  }))
  const { fields, append, remove } = useFieldArray({
    name: 'buttons',
    control: form.control,
  })

  const handleAppend = () => {
    append({
      name: '',
      url: '',
    })
  }

  const handleRemove = (index: number) => () => {
    remove(index)
  }

  const onSubmit = (data: SchemaTypeCreateMailing) => {
    setStep('send')
    setDescription(data)
  }

  const handleBack = () => {
    setStep('users')
  }

  return { form, fields, onSubmit, handleBack, handleAppend, handleRemove }
}
