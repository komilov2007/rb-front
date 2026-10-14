import { memo } from 'react'
import { List } from './style'
import { User } from '../user'
import { useUsers } from './useUsers'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

const INSTAGRAM_ROBO_MARKET_ID = import.meta.env.VITE_API_INSTAGRAM_ROBO_MARKET_ID

const Users = memo(() => {
  const { t } = useTranslation()
  const { type, users, hasMore, handleNext, scrollContainerRef } = useUsers()
  const { subscription } = useProfileStore(state => ({
    subscription: state.me?.subscription,
  }))

  return (
    <List id='scrollableUsersUl' ref={scrollContainerRef}>
      <InfiniteScroll
        hasMore={hasMore}
        next={handleNext}
        scrollableTarget='scrollableUsersUl'
        dataLength={users.length}
        loader={Array.from({ length: 10 }).map((_, i: number) => (
          <Skeleton
            key={i}
            width='100%'
            height='72px'
            component='li'
            variant='rectangular'
            sx={{ mb: '4px', minHeight: '72px' }}
          />
        ))}
        endMessage={
          users.length === 0 ? (
            <Stack
              minHeight='300px'
              flexGrow={1}
              p='20px'
              alignItems='center'
              justifyContent='center'
            >
              {type === 'instagram' ? (
                <Stack gap='10px' alignItems='center'>
                  {subscription?.tariff === 'START' ? (
                    <>
                      {!subscription?.limit?.social_networks && (
                        <Typography variant='title20' align='center'>
                          {t('Instagram_chat_feature_is_available_on_Basic_and_Pro_plans_only')}
                        </Typography>
                      )}
                      <Typography variant='title20' align='center'>
                        {t('upgrade_your_plan_to_respond_to_your_customers_directly_from_appname', {
                          appName: getCurrentDomainMeta().appName,
                        })}
                      </Typography>
                      <Button
                        component={Link}
                        size='mediumSmall'
                        sx={{ minWidth: '147px' }}
                        to={`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`}
                      >
                        {t('learn_more')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography variant='title20' align='center'>
                        {t('connect_to_your_instagram_account_and_respond_to_chats_here')}
                      </Typography>
                      <Button
                        component={Link}
                        size='mediumSmall'
                        sx={{ maxWidth: '150px' }}
                        to={`${ROUTER.ADMIN}/${ROUTER.ROBO_MARKET}/${INSTAGRAM_ROBO_MARKET_ID}`}
                      >
                        {t('install')}
                      </Button>
                    </>
                  )}
                </Stack>
              ) : (
                <Typography variant='title20' align='center'>
                  {t('there_is_no_chatted_user')}
                </Typography>
              )}
            </Stack>
          ) : null
        }
      >
        {users.map(user => (
          <li key={user.id}>
            <User {...user} />
          </li>
        ))}
      </InfiniteScroll>
    </List>
  )
})

export default Users
