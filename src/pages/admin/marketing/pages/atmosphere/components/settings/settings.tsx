import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Wrapper, WrapperHeader } from '../../style'
import { TabLanguages } from '@/components/tab-languages'
import { InputSwitch } from '@/components/inputs/input-switch'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { useSettings, type SettingsProps } from './useSettings'

export const Settings = (props: SettingsProps) => {
  const { t } = useTranslation()
  const { form, panels, onSubmit, isLoading } = useSettings(props)
  const { canEdit } = props

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Stack gap='20px'>
        <Input
          fullWidth
          name={p.title}
          label={p.titleLabel}
          control={form.control}
          disabled={!canEdit}
          placeholder='atmosphere_page_title_placeholder'
        />
        <InputTextarea
          name={p.desc}
          label={p.descLabel}
          control={form.control}
          disabled={!canEdit}
          placeholder='enter_description'
        />
      </Stack>
    ),
  }))

  return (
    <Wrapper>
      <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
        <WrapperHeader>
          <Typography variant='title30' component='h3'>
            {t('atmosphere')}
          </Typography>
          <InputSwitch
            name='is_active'
            control={form.control}
            disabled={!canEdit}
            labelPlacement='start'
            label='atmosphere_show_to_customers'
          />
        </WrapperHeader>
        <Stack p='18px' gap='24px'>
          <TabLanguages panels={PANELS} />
          {canEdit && (
            <Stack alignItems='flex-end'>
              <LoadingButton
                size='small'
                type='submit'
                variant='contained'
                loading={isLoading}
                sx={{ minWidth: '200px' }}
              >
                {t('save')}
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Wrapper>
  )
}
