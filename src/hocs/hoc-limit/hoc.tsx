import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { type HocProps } from '@/types/hoc'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { ReactComponent as IconLimit } from '@/assets/icons/limit.svg'

type HocLimitProps = {
  isBasic?: boolean
} & HocProps

export const HocLimit = ({ isBasic, children }: HocLimitProps) => {
  const { t } = useTranslation()
  const { is_basic, is_expired } = useProfileStore(state => ({
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
  }))

  if (isBasic && is_basic) {
    return null
  }

  if (is_expired) {
    return (
      <Stack height='100%' p='0 10px' alignItems='center' justifyContent='center'>
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            svg: {
              width: { xs: '50%', md: '100%' },
              height: { xs: '50%', md: '100%' },
            },
          }}
        >
          <IconLimit />
        </Stack>
        <Typography m='50px 0 10px' variant='title70' fontSize='20px'>
          {t('expand_your_possibilities')}
        </Typography>
        <Typography
          align='center'
          variant='text30'
          maxWidth='600px'
          mb={{ xs: '15px', md: '35px' }}
        >
          {t(
            'gain_access_to_advanced_features_and_tools_for_your_business_choose_the_professional_or_enterprise_plans_to_enjoy_all_the_benefits',
          )}
        </Typography>
        <Button
          component={Link}
          size='mediumSmall'
          sx={{ minWidth: '147px' }}
          to={`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`}
        >
          {t('learn_more')}
        </Button>
      </Stack>
    )
  }

  return <>{children}</>
}
