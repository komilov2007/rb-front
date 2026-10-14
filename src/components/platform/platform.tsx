import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import { PLATFORMS } from '@/constants/busniness'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import { type PlatformsProps } from '@/types/busniness'

interface PlatformProps {
  platform: PlatformsProps
}

export const Platform = ({ platform }: PlatformProps) => {
  const { t } = useTranslation()
  const links = useProfileStore(state => state.me?.links)
  const currentPlatform = PLATFORMS[platform]
  const Icon = currentPlatform?.Icon
  const label = currentPlatform?.label

  if (!currentPlatform) return null

  if (currentPlatform.link && links?.[currentPlatform.link]) {
    return (
      <Tooltip title={t(label)}>
        <IconButton
          radius='50%'
          target='_blank'
          component={Link}
          to={links[currentPlatform.link]}
          onClick={e => {
            e.stopPropagation()
          }}
          sx={{
            svg: {
              width: '20px',
              height: '20px',
            },
          }}
        >
          <Icon />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Tooltip title={t(label)}>
      <Stack
        justifyContent='center'
        sx={{
          width: '20px',
          height: '20px',
          svg: {
            width: '20px',
            height: '20px',
          },
        }}
      >
        <Icon />
      </Stack>
    </Tooltip>
  )
}
