import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import { Text, TextArea, Container } from './style'
import FormHelperText from '@mui/material/FormHelperText'
import { type InputTextareaProps } from '@/types/components'
import { type FieldValues, useController } from 'react-hook-form'

export const InputTextarea = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  labelMinimum,
  placeholder,
  ...props
}: InputTextareaProps<T>) => {
  const { t } = useTranslation()
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  return (
    <Container error={invalid}>
      {label && (
        <InputLabel error={invalid} htmlFor={id}>
          {t(label as string)}
        </InputLabel>
      )}
      <TextArea
        id={id}
        error={invalid}
        placeholder={t(placeholder as string)}
        {...props}
        {...inputProps}
      />
      {invalid && (
        <FormHelperText
          error={invalid}
          sx={{
            marginTop: '3px',
          }}
        >
          {t(error?.message as string)}
        </FormHelperText>
      )}
      <Text sx={{ bottom: invalid ? '24px' : '1px' }}>
        {typeof labelMinimum === 'number'
          ? t('characters', { value: labelMinimum })
          : t(labelMinimum as unknown as string)}
      </Text>
    </Container>
  )
}
