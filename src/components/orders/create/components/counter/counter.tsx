import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { InputPrice } from '@/components/inputs/input-price'
import { useProfileStore } from '@/store/profile'
import { numberFormat } from '@/utils/number-format'
import { WrapCartButtons, WrapDetailButtons } from './style'
import { useCounter, type CounterProps } from './useCounter'

export const Counter = (props: CounterProps) => {
  const { count, handleCount, handleClick, handleInputChange } = useCounter(props)
  const currency = useProfileStore(state => state.me?.currency?.code)

  return (
    <>
      {props.variant === 'card' && count < 1 ? (
        <Button
          fullWidth
          variant='contained-white'
          onClick={handleClick}
          sx={theme => ({
            color: props.sale_type === 'PERCENT' ? theme.palette.allColors.RED : undefined,
          })}
        >
          {props.status === 'NOT_AVAILABLE' ? (
            'Будет позже'
          ) : props.sale_type === 'PERCENT' ? (
            <>
              <Stack component='span' alignItems='center' direction='row' gap='5px'>
                <Typography
                  variant='text130'
                  component='h6'
                  sx={theme => ({
                    textDecorationLine: 'line-through',
                    textDecorationColor: theme.palette.allColors.RED,
                  })}
                >
                  {numberFormat(props.price)} {currency}
                </Typography>
                <Typography
                  component='h6'
                  variant='text130'
                  color={theme => theme.palette.allColors.RED}
                >
                  -{props.sale_amount} %
                </Typography>
              </Stack>
              {numberFormat(props.discount_price)} {currency}
            </>
          ) : props.sale_type === 'AMOUNT' ? (
            <>
              <Typography
                variant='text130'
                component='h6'
                sx={theme => ({
                  textDecorationLine: 'line-through',
                  textDecorationColor: theme.palette.allColors.GREEN,
                })}
              >
                {numberFormat(props.price)} {currency}
              </Typography>
              {numberFormat(props.discount_price)} {currency}
            </>
          ) : (
            `${numberFormat(props.price)} ${currency}`
          )}
        </Button>
      ) : props.variant === 'cart' ? (
        <WrapCartButtons>
          <IconButton
            radius='23px 0 0 23px'
            onClick={handleCount('-')}
            sx={{ p: '0 7px', width: '35%' }}
          >
            -
          </IconButton>
          <InputPrice
            value={count}
            size='small'
            onChange={handleInputChange}
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            sx={{
              height: '25px',
              width: '50px',
              '.MuiOutlinedInput-root input': {
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 500,
                padding: '0 !important',
              },
            }}
          />
          <IconButton
            radius='0 23px 23px 0'
            onClick={handleCount('+')}
            sx={{ p: '0 7px', width: '35%' }}
          >
            +
          </IconButton>
        </WrapCartButtons>
      ) : props.variant === 'detail' ? (
        <WrapDetailButtons>
          <IconButton
            color='filled'
            onClick={handleCount('-')}
            sx={theme => ({
              color: theme.palette.allColors.BLACK30,
              backgroundColor: theme.palette.allColors.GRAY430,
              ':hover': {
                backgroundColor: theme.palette.allColors.GRAY430,
              },
            })}
          >
            -
          </IconButton>
          <InputPrice
            value={count}
            size='small'
            onChange={handleInputChange}
            inputProps={{
              sx: { textAlign: 'center' },
            }}
            sx={{
              width: '50px',
              height: '35px !important',
              '.MuiOutlinedInput-root input': {
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 500,
                padding: '0 !important',
              },
            }}
          />
          <IconButton color='filled' onClick={handleCount('+')}>
            +
          </IconButton>
        </WrapDetailButtons>
      ) : (
        <Stack gap='5px' direction='row' alignItems='center' justifyContent='space-between'>
          <IconButton radius='7px' color='contained' onClick={handleCount('-')}>
            -
          </IconButton>
          <InputPrice
            size='small'
            value={count}
            onChange={handleInputChange}
            sx={{
              width: '50px',
              height: '32px !important',
              '.MuiOutlinedInput-root input': {
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 500,
                padding: '0 5px!important',
              },
            }}
          />
          <IconButton radius='7px' color='contained' onClick={handleCount('+')}>
            +
          </IconButton>
        </Stack>
      )}
    </>
  )
}
