import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { FormControlLabel } from './style'
import { useTranslation } from 'react-i18next'
import type { CardsProps } from '@/types/atmos'
import { useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { AddCreditCard } from '../../forms/add-credit-card'
import { getCreditCardIcon } from '@/utils/credit-card'
import { DeleteCreditCard } from '@/components/deletes/credit-card'
import { getTitle } from '@/constants/domain-themes'

interface CreditCardsProps {
  data: CardsProps[]
}

export const CreditCards = ({ data }: CreditCardsProps) => {
  const form = useFormContext()
  const { t } = useTranslation()
  const hasAccessAddCard = getTitle().atmos

  if (!hasAccessAddCard) return null

  return (
    <Stack pt='24px'>
      <Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          {data.length === 0 ? (
            <div />
          ) : (
            <Typography component='h2'>{t('stored_cards')}</Typography>
          )}
          <AddCreditCard variant='card' />
        </Stack>
        <Stack mt='10px' gap='15px' component='ul'>
          <Stack gap='16px'>
            {data.map(({ id, card_number }) => {
              const Icon = getCreditCardIcon(card_number)
              return (
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio />}
                  active={form.watch('payment_type') === id}
                  label={
                    <Stack
                      width='100%'
                      flexGrow={1}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Stack gap='10px' alignItems='center' direction='row'>
                        <Icon />
                        {card_number}
                      </Stack>
                      <DeleteCreditCard id={id} />
                    </Stack>
                  }
                />
              )
            })}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
