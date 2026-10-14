import Box from '@mui/material/Box'
import { Message } from '../message'
import Stack from '@mui/material/Stack'
import { LIMIT, useBody } from './useBody'
import Skeleton from '@mui/material/Skeleton'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Container, WrapNoMessage } from './style'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Body = () => {
  const { t } = useTranslation()
  const { currenUser, handleNext } = useBody()

  return (
    <Container id='scrollableMessagesDiv'>
      <InfiniteScroll
        inverse
        next={handleNext}
        hasMore={currenUser.hasMore}
        dataLength={currenUser.messages.length}
        scrollableTarget='scrollableMessagesDiv'
        loader={
          currenUser.page === 1 ? (
            <Stack gap='11px'>
              {Array.from({ length: LIMIT }, (_, i) => {
                const isOdd = i % 2 !== 0
                return (
                  <Box
                    key={i}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: isOdd ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box sx={{ width: '100%', maxWidth: isOdd ? '80%' : '70%' }}>
                      <Skeleton
                        width='100%'
                        variant='rounded'
                        animation={false}
                        sx={{
                          height: 72,
                          borderRadius: '12px',
                        }}
                      />
                    </Box>
                  </Box>
                )
              })}
            </Stack>
          ) : (
            <Spinner center />
          )
        }
        endMessage={
          currenUser.messages.length === 0 ? (
            <WrapNoMessage>
              <Typography variant='title10'>{t('no_message_here_yet')}</Typography>
            </WrapNoMessage>
          ) : null
        }
      >
        {currenUser.messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </InfiniteScroll>
    </Container>
  )
}
