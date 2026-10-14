import ReactQuill from 'react-quill'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import type { InputTextEditorProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'

import 'react-quill/dist/quill.snow.css'

export const InputTextEditor = <T extends FieldValues>({
  name,
  label,
  control,
  maxLength,
  placeholder,
}: InputTextEditorProps<T>) => {
  const { t } = useTranslation()
  return (
    <Stack
      width='100%'
      sx={{
        '.ql-editor': {
          fontSize: '16px !important',
        },
        '.ql-container': {
          minHeight: '100px',
        },
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {label && (
              <InputLabel
                htmlFor={name}
                error={fieldState.invalid}
                sx={{ mb: '5px', transform: 'none' }}
              >
                {t(label)}
              </InputLabel>
            )}
            <ReactQuill
              theme='snow'
              value={field.value || ''}
              onChange={e => {
                const value = e === '<p><br></p>' ? '' : e
                field.onChange(value)
              }}
              placeholder={t(placeholder ?? '')}
              modules={{
                toolbar: [['bold', 'italic', 'underline', 'strike']],
              }}
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            />
            <Stack
              gap='5px'
              width='100%'
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              {fieldState.invalid ? (
                <FormHelperText error>{t(fieldState.error?.message ?? '')}</FormHelperText>
              ) : (
                <div />
              )}
              <Typography
                mt='3px'
                variant='caption'
                color={theme => theme.palette.allColors.GRAY20}
              >
                {maxLength}
              </Typography>
            </Stack>
          </>
        )}
      />
    </Stack>
  )
}
