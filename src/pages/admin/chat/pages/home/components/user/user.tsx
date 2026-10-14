import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { useChatStore } from '@/store/chat'
import { useParams } from 'react-router-dom'
import { stringAvatar } from '@/utils/avatar'
import { useFormContext } from 'react-hook-form'
import { type ParamProps } from '@/types/params'
import Typography from '@mui/material/Typography'
import { type ChatUserProps } from '@/types/chat'
import { type SchemaTypeChat } from '@/utils/schema'
import { Link, Badge, Content, Container } from './style'

export const User = (props: ChatUserProps) => {
  const { chatId } = useParams<ParamProps>()
  const form = useFormContext<SchemaTypeChat>()
  const handleUpdateCurrentUser = useChatStore(state => state.handleUpdateCurrentUser)

  const handleClick = () => {
    form.reset({})
    handleUpdateCurrentUser()
  }

  return (
    <Link
      to={`${props.id}`}
      state={props}
      onClick={handleClick}
      sx={{ pointerEvents: Number(chatId) === props.id ? 'none' : 'unset' }}
    >
      {({ isActive }) => (
        <Container
          sx={theme => ({
            backgroundColor: isActive
              ? theme.palette.colors['L-GRAY-D-GRAY40']
              : theme.palette.allColors.TRANSPARENT,
          })}
        >
          <Avatar
            src={props.photo}
            {...stringAvatar(props.firstname ?? '', {
              width: 48,
              height: 48,
            })}
          />
          <Content>
            <Box gap='20px' display='flex'>
              <Typography
                component='h5'
                variant='title30'
                sx={{
                  width: '100%',
                  fontSize: '16px',
                  overflow: 'hidden',
                  lineHeight: '20px',
                  textOverflow: 'ellipsis',
                }}
              >
                {props.firstname}
              </Typography>
              {props.last_chat_time && (
                <Typography variant='text40' fontSize='12px' lineHeight='16px' component='span'>
                  {dayjs(props.last_chat_time).format('HH:mm')}
                </Typography>
              )}
            </Box>
            <Box gap='30px' display='flex'>
              <Typography
                component='h6'
                variant='text40'
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {props.chat.last_chat}
              </Typography>
              {props.chat.new_chats_count > 0 && <Badge>{props.chat.new_chats_count}</Badge>}
            </Box>
          </Content>
        </Container>
      )}
    </Link>
  )
}
