import { Image } from '../image'
import { Counter } from '../counter'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useOrderStore } from '@/store/order'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from '@/hooks/useBoolean'
import { Formalization } from '../formalization'
import { Card, Footer, Container } from './style'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { numberFormat } from '@/utils/number-format'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import useMediaQuery from '@mui/material/useMediaQuery'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconCartShop } from '@/assets/icons/cart-shop.svg'
import { ReactComponent as IconEmptySolid } from '@/assets/icons/empty-solid.svg'
import { ReactComponent as IconTrashOutline } from '@/assets/icons/trash-outline.svg'

interface CartProps {
  handleClose: () => void
}

export const Cart = (props: CartProps) => {
  const theme = useTheme()
  const modal = useBoolean()
  const { t } = useTranslation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const currency = useProfileStore(state => state.me?.currency?.code)
  const { total, cartsCard, cartsDetail, setCartsCard, setCartsDetail, isMoreThanOne } =
    useOrderStore(state => ({
      total: state.total,
      cartsCard: state.cartsCard,
      cartsDetail: state.cartsDetail,
      setCartsCard: state.setCartsCard,
      setCartsDetail: state.setCartsDetail,
      isMoreThanOne: state.cartsCard.length > 0 || state.cartsDetail.length > 0,
    }))

  const handleClear = () => {
    setCartsCard([])
    setCartsDetail([])
  }

  const content = (
    <Container>
      <Stack p='12px 12px 0' direction='row' justifyContent='space-between'>
        <Typography variant='title10'>{t('cart')}</Typography>
        {isMoreThanOne && (
          <Stack m='-9px -9px 0 0'>
            <IconButton onClick={handleClear}>
              <IconTrashOutline />
            </IconButton>
          </Stack>
        )}
      </Stack>
      {isMoreThanOne ? (
        <Stack height='100%' overflow='hidden' justifyContent='space-between'>
          <Stack p='0 12px' width='100%' sx={{ height: 'calc(100% - 80px)', overflowY: 'auto' }}>
            {cartsCard.map(cart => (
              <Card key={cart.id}>
                <Stack gap='6px' direction='row' alignItems='center'>
                  <Stack sx={{ height: '48px', width: '48px' }} position='relative'>
                    <Image radius='12px' alt={cart.name} src={cart.photo} />
                    {DISCOUNT_OPTIONS[cart.sale_type] && (
                      <Stack
                        top='-5px'
                        left='-5px'
                        zIndex='9999'
                        position='absolute'
                        sx={{
                          svg: {
                            width: '25px',
                            height: '25px',
                          },
                        }}
                      >
                        {DISCOUNT_OPTIONS[cart.sale_type].icon}
                      </Stack>
                    )}
                  </Stack>
                  <Stack justifyContent='center'>
                    <Typography noWrap variant='text50' lineHeight='normal' maxWidth='105px'>
                      {cart.name}
                    </Typography>
                    <Typography
                      variant='text140'
                      lineHeight='normal'
                      color={theme => theme.palette.allColors.PURPLE}
                    >
                      {numberFormat(cart.totalPrice)} {currency}
                    </Typography>
                  </Stack>
                </Stack>
                <Counter {...cart} variant='cart' />
              </Card>
            ))}
            {cartsDetail.map((cart, index: number) => (
              <Card key={cart.id}>
                <Stack gap='6px' direction='row' alignItems='center'>
                  <Stack sx={{ height: '48px', width: '48px' }} position='relative'>
                    <Image radius='12px' alt={cart.name} src={cart.photos[0].photo} />
                    {DISCOUNT_OPTIONS[cart.sale_type] && (
                      <Stack
                        top='-5px'
                        left='-5px'
                        zIndex='9999'
                        position='absolute'
                        sx={{
                          svg: {
                            width: '25px',
                            height: '25px',
                          },
                        }}
                      >
                        {DISCOUNT_OPTIONS[cart.sale_type].icon}
                      </Stack>
                    )}
                  </Stack>
                  <Stack justifyContent='center'>
                    <Typography noWrap variant='text50' lineHeight='normal' maxWidth='105px'>
                      {cart.name}
                    </Typography>
                    <Typography
                      variant='text140'
                      lineHeight='normal'
                      color={theme => theme.palette.allColors.PURPLE}
                    >
                      {numberFormat(cart.totalPrice)} {currency}
                    </Typography>
                  </Stack>
                </Stack>
                <Counter
                  {...cart}
                  index={index}
                  variant='cart'
                  count={cart.count}
                  have_parameter
                  id={cart.id}
                />
              </Card>
            ))}
          </Stack>
          <Footer>
            <Formalization handleClose={props.handleClose} />
          </Footer>
        </Stack>
      ) : (
        <Stack gap='12px' flexGrow={1} alignItems='center' justifyContent='center'>
          <Stack alignItems='center'>
            <IconEmptySolid />
          </Stack>
          <Typography
            align='center'
            component='h3'
            fontSize='16px'
            variant='title10'
            maxWidth='200px'
          >
            {t('your_cart_is_currently_empty')}
          </Typography>
        </Stack>
      )}
    </Container>
  )

  return (
    <>
      {matches ? (
        <>
          <Button
            startIcon={<IconCartShop />}
            onClick={modal.setTrue}
            sx={{
              mb: '10px',
              position: 'relative',
              '.MuiButton-icon': {
                left: '20px',
                position: 'absolute',
              },
            }}
          >
            {numberFormat(total)} {currency}
          </Button>
          <SwipeableDrawer
            anchor='right'
            open={modal.value}
            onOpen={modal.setTrue}
            onClose={modal.setFalse}
          >
            <Stack p='50px 24px 20px' flexGrow={1}>
              <Stack
                alignItems='flex-end'
                sx={{
                  top: 0,
                  right: 0,
                  mb: '32px',
                  p: '7px 7px 0 0',
                  position: 'absolute',
                }}
              >
                <IconButton onClick={modal.setFalse}>
                  <IconRemove />
                </IconButton>
              </Stack>
              {content}
            </Stack>
          </SwipeableDrawer>
        </>
      ) : (
        content
      )}
    </>
  )
}
