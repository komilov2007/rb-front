// import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { WrapExpired, ExpiredContent } from './style'

interface ExpiredProps {
  image: string
  title?: string
  description?: string
}

export const Expired = ({ image, title, description }: ExpiredProps) => {
  const { t } = useTranslation()

  return (
    <WrapExpired>
      <img src={image} />
      <ExpiredContent>
        <Typography align='center' m='50px 0 10px' variant='title70' fontSize='20px'>
          {title ? t(title) : t('expand_your_possibilities')}
        </Typography>
        <Typography
          align='center'
          variant='text30'
          maxWidth='600px'
          mb={{ xs: '15px', md: '35px' }}
        >
          {description
            ? t(description)
            : t(
                'gain_access_to_advanced_features_and_tools_for_your_business_choose_the_professional_or_enterprise_plans_to_enjoy_all_the_benefits',
              )}
        </Typography>
        <a href={`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`} style={{ color: 'white' }}>
          <Button
            // component={Link}
            size='mediumSmall'
            sx={{ minWidth: '147px' }}
            // to={`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`}
          >
            {t('learn_more')}
          </Button>
        </a>
      </ExpiredContent>
    </WrapExpired>
  )
}
