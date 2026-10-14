import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import type { ChangeEvent } from 'react'
import { Alert } from '@/components/alert'
import { useTranslation } from 'react-i18next'
import type { MeProps } from '@/types/profile'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import RadioGroup from '@mui/material/RadioGroup'
import type { LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import { InputCheckbox } from '../../inputs/input-checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import type { SchemaTypeTelegramBotLanguages } from '@/utils/schema'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

export const Languages = () => {
  const { t } = useTranslation()
  const {
    me,
    setMe,
    languages = [],
  } = useProfileStore(state => ({
    me: state.me,
    setMe: state.setMe,
    languages: state.me?.languages,
  }))

  const form = useFormContext<SchemaTypeTelegramBotLanguages>()
  const { fields } = useFieldArray({
    name: 'languages',
    control: form.control,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let newLanguages: LanguageTypes[]
    const language = e.target.id as LanguageTypes

    if (checked) {
      const orderedLanguages = Object.keys(LANGUAGE_OPTIONS)
      newLanguages = [...languages]
      orderedLanguages.forEach(lang => {
        if (lang === language) {
          newLanguages.push(lang)
        }
      })
    } else {
      if (form.watch('main_language') === e.target.id) {
        form.setValue('main_language', '')
      }
      newLanguages = languages?.filter(l => l !== language)
    }

    if (me) {
      const newMe: MeProps = {
        ...me,
        languages: newLanguages,
      }
      setMe(newMe)
    }
  }

  return (
    <Box mb='43px'>
      <Typography mb='8px' variant='title10' component='h4'>
        {t('language_settings')}
      </Typography>
      <Alert>
        <Typography
          variant='text'
          lineHeight='22px'
          color={theme => theme.palette.allColors.BLACK30}
        >
          {t('select_the_languages_your_site_will_support')}
        </Typography>
      </Alert>
      <Box
        ml='-9px'
        mt='12px'
        display='flex'
        flexDirection='column'
        component='ul'
        width='fit-content'
      >
        <Controller
          name='main_language'
          control={form.control}
          render={({ field: { value, ...rest }, fieldState }) => {
            return (
              <RadioGroup error={fieldState.invalid} value={value ?? ''} {...rest}>
                {fields.map((item, index) => {
                  return (
                    <Stack
                      gap='10px'
                      key={item.id}
                      component='li'
                      direction='row'
                      justifyContent='space-between'
                    >
                      <InputCheckbox
                        id={item.value}
                        label={item.label}
                        control={form.control}
                        onChange={handleChange}
                        name={`languages.${index}.checked`}
                        error={!!form.formState.errors.languages}
                      />
                      <FormControlLabel
                        value={item.value}
                        control={<Radio />}
                        label={t('main_language')}
                        disabled={!form.watch(`languages.${index}.checked`)}
                      />
                    </Stack>
                  )
                })}
              </RadioGroup>
            )
          }}
        />
      </Box>
    </Box>
  )
}
