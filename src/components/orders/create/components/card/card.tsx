import { Image } from '../image'
import { Detail } from '../detail'
import { Counter } from '../counter'
import Stack from '@mui/material/Stack'
import { Container, WrapImage } from './style'
import { useRef, type MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import { type OrderProductsProps } from '@/types/products'

interface RefDetailProps {
  setTrue: () => void
}

export const Card = (props: OrderProductsProps) => {
  const refDetail = useRef<RefDetailProps>()
  const hanleOpenDetail = () => {
    refDetail.current?.setTrue()
  }

  const handleClickCounter = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (props.have_parameter) {
      refDetail.current?.setTrue()
    }
  }

  return (
    <>
      <Container
        onClick={hanleOpenDetail}
        disabled={
          props.status === 'NOT_AVAILABLE' || (props.status === 'LIMITED' && props.amount === 0)
        }
      >
        <WrapImage>
          <Image src={props.photo} alt={props.name} radius='10px' />
          {DISCOUNT_OPTIONS[props.sale_type] && (
            <Stack position='absolute' zIndex='9999'>
              {DISCOUNT_OPTIONS[props.sale_type].icon}
            </Stack>
          )}
        </WrapImage>
        <Stack flexGrow={1} justifyContent='space-between' p='4px 10px 10px'>
          <Stack>
            <Typography variant='text290' component='h4'>
              {props.name}
            </Typography>
          </Stack>
          <Stack onClick={handleClickCounter}>
            <Counter {...props} variant='card' count={0} />
          </Stack>
        </Stack>
      </Container>
      <Detail ref={refDetail} {...props} />
    </>
  )
}
