import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { Image } from '@/components/image'
import { VIDEO } from '@/constants/media'
import { ReactComponent as IconEditSolid } from '@/assets/icons/edit-solid2.svg'
import { Link } from 'react-router-dom'
import { ROUTER } from '@/constants/router'
import { ReactComponent as IconDragAndDrop } from '@/assets/icons/drag.svg'
import { type DroppableProvided } from 'react-beautiful-dnd'
import { type BannersPropsOnlineShop } from '@/types/banners'
import { Delete } from '../delete'
import { StyledCard } from './style'

interface CardProps {
  size: 'medium' | 'small'
  type: 'MAIN' | 'CATEGORY'
  provided?: DroppableProvided
  canDelete: boolean
  canEdit: boolean
  banner: BannersPropsOnlineShop
}

const EditFormButton = ({ id }: { id: number }) => {
  return (
    <IconButton
      radius='8px'
      sx={{
        width: '37px',
        height: '37px',
        border: theme => `1px solid ${theme.palette.allColors.GREEN}`,
        backgroundColor: theme => theme.palette.allColors.GREEN20,
      }}
      component={Link}
      to={`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.BANNERS}/${ROUTER.EDIT}/${id}`}
    >
      <IconEditSolid />
    </IconButton>
  )
}

export const Card = ({ size, type, provided, canDelete, canEdit, banner }: CardProps) => {
  const { t } = useTranslation()

  return (
    // @ts-ignore
    <StyledCard ref={provided?.innerRef} {...provided?.draggableProps}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack gap='8px' direction='row' alignItems='center'>
          {canDelete && <Delete id={banner.id} />}
          {canEdit && <EditFormButton id={banner.id} />}
        </Stack>
        {type !== 'CATEGORY' && (
          //  @ts-ignore
          <Stack {...provided?.dragHandleProps}>
            <IconButton
              radius='8px'
              sx={{
                width: '37px',
                height: '37px',
                border: theme => `1px solid ${theme.palette.allColors.GRAY850}`,
                backgroundColor: theme => theme.palette.allColors.WHITE,
              }}
            >
              <IconDragAndDrop />
            </IconButton>
          </Stack>
        )}
      </Stack>
      {VIDEO.some(ext => banner.mobile_photo_url?.endsWith(`.${ext}`)) ? (
        <Stack
          component='video'
          src={banner.mobile_photo_url}
          autoPlay
          loop
          muted
          sx={{
            height: size === 'medium' ? '295px' : '92px',
            my: '12px',
            borderRadius: '20px',
            objectFit: 'cover',
            width: '100%',
          }}
        />
      ) : (
        <Image
          radius='20px'
          alt={banner.created_at}
          sx={{ height: size === 'medium' ? '295px' : '92px', my: '12px' }}
          src={banner.mobile_photo_url}
        />
      )}
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography
          sx={{
            color: theme => theme.palette.allColors.GRAY840,
          }}
          variant='text'
          fontSize='13px'
        >
          {t('last_updated')}
        </Typography>
        <Typography
          sx={{
            color: theme => theme.palette.allColors.BLACK30,
            textAlign: 'right',
          }}
          variant='title40'
          fontSize='13px'
        >
          {dayjs(banner.updated_at || banner.created_at).format('DD.MM.YYYY, HH:mm')}
        </Typography>
      </Stack>
      {type === 'CATEGORY' && (
        <Stack pt='6px' direction='row' alignItems='center' justifyContent='space-between'>
          <Typography
            sx={{
              color: theme => theme.palette.allColors.GRAY840,
            }}
            variant='text'
            fontSize='13px'
          >
            {t('category')}
          </Typography>
          <Typography
            sx={{
              color: theme => theme.palette.allColors.BLACK30,
            }}
            variant='title40'
            fontSize='13px'
          >
            {banner.category_name}
          </Typography>
        </Stack>
      )}
    </StyledCard>
  )
}
