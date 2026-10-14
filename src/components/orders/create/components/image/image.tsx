import { Container } from './style'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react'
import ImagePlaceholderProduct from '@/assets/images/placeholder-product.png'
import { LazyLoadImage, type LazyLoadImageProps } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css'

const LazyImage = LazyLoadImage as unknown as (props: LazyLoadImageProps) => JSX.Element

interface ImageProps extends DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> {
  radius?: string
}

export const Image = (props: ImageProps) => {
  const { value, setFalse } = useBoolean(true)

  return (
    <Container>
      {value && (
        <div className='loading'>
          <Skeleton
            width='100%'
            height='100%'
            variant='rectangular'
            sx={{ borderRadius: props.radius }}
          />
        </div>
      )}
      <LazyImage
        width='100%'
        effect='blur'
        height='100%'
        src={props.src ?? ImagePlaceholderProduct}
        alt={props.alt}
        afterLoad={setFalse}
        style={{ borderRadius: props.radius }}
        onError={({ currentTarget }) => {
          setFalse()
          currentTarget.onerror = null
          currentTarget.src = ImagePlaceholderProduct
        }}
      />
    </Container>
  )
}
