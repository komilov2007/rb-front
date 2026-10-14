import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { Container, WrapBorder } from './style'
import { type OrderDetailProps } from '@/types/order'
import Typography from '@mui/material/Typography'
import { numberFormat } from '@/utils/number-format'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import { ReactComponent as IconBorder } from '@/assets/icons/border.svg'

export const Products = (props: OrderDetailProps) => {
  return (
    <Container>
      {props?.items?.products.map(p => {
        const isNew = p?.is_external

        return isNew ? (
          <Stack key={p.id}>
            <Stack gap='20px' direction='row' justifyContent='space-between'>
              <Stack gap='5px' direction='row' alignItems='center'>
                <Stack position='relative'>
                  <Image
                    radius='5px'
                    src={p?.media}
                    alt={p.product_snapshot?.name}
                    sx={{ height: '40px', width: '42px' }}
                  />
                  {p.product_snapshot?.sale_type &&
                    DISCOUNT_OPTIONS[p.product_snapshot?.sale_type] && (
                      <Stack
                        top='-8px'
                        left='-8px'
                        zIndex='9999'
                        position='absolute'
                        sx={{
                          svg: {
                            width: '25px',
                            height: '25px',
                          },
                        }}
                      >
                        {DISCOUNT_OPTIONS[p.product_snapshot.sale_type].icon}
                      </Stack>
                    )}
                </Stack>
                {p.product_snapshot.variants.length > 0 && (
                  <Stack>
                    {p.product_snapshot.variants.map(variant => (
                      <Stack key={variant.id}>
                        <Typography component='h4' variant='text110'>
                          <Typography
                            mr='7px'
                            component='span'
                            variant='inherit'
                            color={theme => theme.palette.allColors.GREEN}
                          >
                            {variant.name}
                          </Typography>
                          {variant.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}
                <Typography component='h4' variant='text110' fontWeight='600'>
                  {p.parameter ? null : (
                    <Typography
                      mr='7px'
                      component='span'
                      variant='inherit'
                      color={theme => theme.palette.allColors.GREEN}
                    >
                      x{p.count} {p.product_snapshot?.unit}
                    </Typography>
                  )}
                  {p.product_snapshot?.name ?? '-'}
                </Typography>
              </Stack>
              <Stack gap='10px' direction='row' alignItems='center'>
                {p.product_snapshot?.sale_type && (
                  <Typography
                    variant='text130'
                    component='h6'
                    sx={theme => ({
                      textDecorationLine: 'line-through',
                      textDecorationColor:
                        p.product_snapshot.sale_type === 'AMOUNT'
                          ? theme.palette.allColors.GREEN
                          : theme.palette.allColors.RED,
                    })}
                  >
                    {numberFormat(p.product_snapshot.price)} {props.items.currency.code}
                  </Typography>
                )}
                <Typography
                  component='p'
                  align='right'
                  variant='text110'
                  fontWeight='500'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {numberFormat(p.amount)} {props.items.currency.code}
                </Typography>
              </Stack>
            </Stack>
            {p.parameter && (
              <Stack ml='50px'>
                <Typography component='h4' variant='text110'>
                  <Typography
                    mr='7px'
                    component='span'
                    variant='inherit'
                    color={theme => theme.palette.allColors.GREEN}
                  >
                    x{p.count} {p.product_snapshot?.unit}
                  </Typography>
                  {p.parameter?.name ?? '-'}
                </Typography>
              </Stack>
            )}
            {p.additional_parameter.length > 0 && (
              <Stack ml='50px'>
                {p.additional_parameter.map((a, i: number) => (
                  <Stack key={i}>
                    <Typography component='h4' variant='text110'>
                      <Typography
                        mr='7px'
                        component='span'
                        variant='inherit'
                        color={theme => theme.palette.allColors.GREEN}
                      >
                        x{p.count} {p.product_snapshot?.unit}
                      </Typography>
                      {a.name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        ) : (
          <Stack key={p.id}>
            <Stack gap='20px' direction='row' justifyContent='space-between'>
              <Stack gap='5px' direction='row' alignItems='center'>
                <Stack position='relative'>
                  <Image
                    radius='5px'
                    src={p?.media}
                    alt={p.product?.name}
                    sx={{ height: '40px', width: '42px' }}
                  />
                  {p.product?.sale_type && DISCOUNT_OPTIONS[p.product?.sale_type] && (
                    <Stack
                      top='-8px'
                      left='-8px'
                      zIndex='9999'
                      position='absolute'
                      sx={{
                        svg: {
                          width: '25px',
                          height: '25px',
                        },
                      }}
                    >
                      {DISCOUNT_OPTIONS[p.product.sale_type].icon}
                    </Stack>
                  )}
                </Stack>
                <Typography component='h4' variant='text110' fontWeight='600'>
                  {p.parameter ? null : (
                    <Typography
                      mr='7px'
                      component='span'
                      variant='inherit'
                      color={theme => theme.palette.allColors.GREEN}
                    >
                      x{p.count} {p.product?.unit}
                    </Typography>
                  )}
                  {p.product?.name ?? '-'}
                </Typography>
              </Stack>
              <Stack gap='10px' direction='row' alignItems='center'>
                {p.product?.sale_type && (
                  <Typography
                    variant='text130'
                    component='h6'
                    sx={theme => ({
                      textDecorationLine: 'line-through',
                      textDecorationColor:
                        p.product.sale_type === 'AMOUNT'
                          ? theme.palette.allColors.GREEN
                          : theme.palette.allColors.RED,
                    })}
                  >
                    {numberFormat(p.product.price)} {props.items.currency.code}
                  </Typography>
                )}
                <Typography
                  component='p'
                  align='right'
                  variant='text110'
                  fontWeight='500'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {numberFormat(p.amount)} {props.items.currency.code}
                </Typography>
              </Stack>
            </Stack>
            {p.parameter && (
              <Stack ml='50px'>
                <Typography component='h4' variant='text110'>
                  <Typography
                    mr='7px'
                    component='span'
                    variant='inherit'
                    color={theme => theme.palette.allColors.GREEN}
                  >
                    x{p.count} {p.product?.unit}
                  </Typography>
                  {p.parameter?.name ?? '-'}
                </Typography>
              </Stack>
            )}
            {p.additional_parameter.length > 0 && (
              <Stack ml='50px'>
                {p.additional_parameter.map((a, i: number) => (
                  <Stack key={i}>
                    <Typography component='h4' variant='text110'>
                      <Typography
                        mr='7px'
                        component='span'
                        variant='inherit'
                        color={theme => theme.palette.allColors.GREEN}
                      >
                        x{p.count} {p.product?.unit}
                      </Typography>
                      {a.name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        )
      })}
      <WrapBorder>
        <IconBorder />
      </WrapBorder>
    </Container>
  )
}
