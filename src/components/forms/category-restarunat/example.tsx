import Box from '@mui/material/Box'
import { Alert } from '@/components/alert'
import Typography from '@mui/material/Typography'
import product1 from '@/assets/images/product-1.png'
import product2 from '@/assets/images/product-2.png'
import product3 from '@/assets/images/product-3.png'
import product4 from '@/assets/images/product-4.png'
import { Trans, useTranslation } from 'react-i18next'

const EXAMPLES = [product1, product2, product3, product4]

export const Example = () => {
  const { t } = useTranslation()

  return (
    <Box m='20px 0 28px'>
      <Alert>
        <Typography variant='text10' lineHeight='19px'>
          {t(
            'upload_categories_in_png_format_to_make_it_easier_for_users_to_see_below_are_some_examples',
          )}
        </Typography>
        <Typography mt='1px' mb='10px' variant='text10' lineHeight='19px' component='h6'>
          <Trans
            i18nKey='size'
            values={{ value: '128px X 128px' }}
            components={{
              linkTag: <Typography variant='inherit' fontWeight='400' component='span' />,
            }}
          />
        </Typography>
        <Typography variant='text10' lineHeight='19px' textTransform='uppercase'>
          {t('examples')}
        </Typography>
        <Box mt='2px' gap='8px' display='flex' component='ul'>
          {EXAMPLES.map((src, index) => (
            <Box key={index} component='li' sx={{ width: '52px', height: '52px' }}>
              <img src={src} alt={`example-${index}`} />
            </Box>
          ))}
        </Box>
      </Alert>
    </Box>
  )
}
