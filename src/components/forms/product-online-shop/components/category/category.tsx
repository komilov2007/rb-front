import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { UploadProductVideo } from '../upload-product-video'
import { SelectCategoriesOnlineShopProducts } from '@/components/selects/select-categories-online-shop-products'
import { UploadMultipleProductOnlineShopImage } from '@/components/uploads/upload-multiple-product-online-shop-image'

interface CategoryProps {
  isCreate?: boolean
}

export const Category = ({ isCreate }: CategoryProps) => {
  const { t } = useTranslation()

  return (
    <Stack gap='24px'>
      <Stack gap='12px'>
        <Typography variant='title160'>{t('product_photos')}</Typography>
        <UploadMultipleProductOnlineShopImage />
      </Stack>
      <Divider />
      {!isCreate && (
        <>
          <Stack gap='12px'>
            <Stack gap='8px' direction='row' alignItems='center'>
              <Typography variant='title160'>{t('product_video')}</Typography>
              <Typography variant='text300'>{t('optional')}</Typography>
            </Stack>
            <UploadProductVideo />
          </Stack>
          <Divider />
        </>
      )}
      <SelectCategoriesOnlineShopProducts />
    </Stack>
  )
}
