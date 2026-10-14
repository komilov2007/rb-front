import { Conatiner } from './style'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import type { Theme, SxProps } from '@mui/material/styles'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import ImagePlaceholder from '@/assets/images/placeholder.png'
import { LazyLoadImage, type LazyLoadImageProps } from 'react-lazy-load-image-component'

import 'react-photo-view/dist/react-photo-view.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const LazyImage = LazyLoadImage as unknown as (props: LazyLoadImageProps) => JSX.Element

interface ImageProps {
  alt: string
  src: string
  isGallery?: boolean
  radius?: number | string
  sx?: SxProps<Theme> | undefined
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Image = ({ sx, alt, src, radius, isGallery = false, onClick }: ImageProps) => {
  const { value, setFalse } = useBoolean(true)
  const hasSrc = Boolean(src)

  if (!isGallery) {
    return (
      <Conatiner sx={sx} radius={radius}>
        {value && (
          <Box className='loading'>
            <Skeleton
              width='100%'
              height='100%'
              variant='rectangular'
              sx={{ borderRadius: radius }}
            />
          </Box>
        )}
        <LazyImage
          alt={alt}
          width='100%'
          effect='blur'
          height='100%'
          src={src ?? ImagePlaceholder}
          afterLoad={setFalse}
          onError={({ currentTarget }) => {
            setFalse()
            currentTarget.onerror = null
            currentTarget.src = ImagePlaceholder
          }}
        />
      </Conatiner>
    )
  }

  const content = (
    <Conatiner sx={sx} radius={radius} onClick={onClick}>
      {value && (
        <Box className='loading'>
          <Skeleton
            width='100%'
            height='100%'
            variant='rectangular'
            sx={{ borderRadius: radius }}
          />
        </Box>
      )}
      <LazyImage
        alt={alt}
        src={src ?? ImagePlaceholder}
        width='100%'
        effect='blur'
        height='100%'
        afterLoad={setFalse}
        onError={({ currentTarget }) => {
          setFalse()
          currentTarget.onerror = null
          currentTarget.src = ImagePlaceholder
        }}
      />
    </Conatiner>
  )

  if (isGallery && hasSrc) {
    return (
      <PhotoProvider>
        <PhotoView src={src}>{content}</PhotoView>
      </PhotoProvider>
    )
  }

  return content
}
