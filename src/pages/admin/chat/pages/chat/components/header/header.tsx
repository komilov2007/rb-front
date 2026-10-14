import { Fragment } from 'react'
import { Container } from './style'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { ROUTER } from '@/constants/router'
import { useChatStore } from '@/store/chat'
import { stringAvatar } from '@/utils/avatar'
import { Platform } from '@/components/platform'
import { type ParamProps } from '@/types/params'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

export const Header = () => {
  const { chatId } = useParams<ParamProps>()
  const currenUser = useChatStore(state => state.currenUser)

  return (
    <Container>
      <IconButton
        component={Link}
        to={`${ROUTER.ADMIN}/${ROUTER.CHAT}`}
        sx={{ ml: '-9px', transform: 'rotate(90deg)' }}
      >
        <IconDirectionDown />
      </IconButton>
      <Stack
        component={Link}
        to={`${ROUTER.ADMIN}/${ROUTER.CUSTOMERS}/${chatId}`}
        sx={{ pointerEvents: currenUser.platform.includes('INSTAGRAM') ? 'none' : 'unset' }}
      >
        <Avatar
          src={currenUser?.photo ?? ''}
          {...stringAvatar(currenUser?.firstname ?? '', {
            width: 36,
            height: 36,
          })}
        />
      </Stack>
      <Stack>
        <Stack gap='5px' direction='row' alignItems='center'>
          <Typography
            variant='title50'
            component={Link}
            to={`${ROUTER.ADMIN}/${ROUTER.CUSTOMERS}/${chatId}`}
            sx={{ pointerEvents: currenUser.platform.includes('INSTAGRAM') ? 'none' : 'unset' }}
          >
            {currenUser.firstname}
          </Typography>
          <Stack gap='3px' direction='row' alignItems='center'>
            {currenUser.platform.map((p, i) => (
              <Fragment key={p}>
                {i !== 0 && '/'}
                <Platform platform={p} />
              </Fragment>
            ))}
          </Stack>
        </Stack>
        {currenUser?.phone && (
          <Typography
            component='a'
            variant='text40'
            href={`tel:${currenUser.phone}`}
            color={theme => theme.palette.allColors.GRAY160}
          >
            {currenUser.phone}
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
