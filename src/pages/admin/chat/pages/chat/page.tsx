import Box from '@mui/material/Box'
import { Body } from './components/body'
import { useChatStore } from '@/store/chat'
import { ROUTER } from '@/constants/router'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { Spinner } from '@/components/spinner'
import type { ErrorProps } from '@/types/error'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import { getChatCustomerInfo } from '@/apis/admin/chat'
import { useNavigate, useParams } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

const Page = () => {
  const navigate = useNavigate()
  const { chatId } = useParams<ParamProps>()
  const { currenUser, setCurrentUser } = useChatStore(state => ({
    currenUser: state.currenUser,
    setCurrentUser: state.setCurrentUser,
  }))
  const can_edit = useProfileStore(state => state.getPermission('chat', 'can_edit'))
  const { isLoading, isFetching } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CHAT_USER_HEADER, chatId],
    queryFn: async () => await getChatCustomerInfo(chatId),
    onSuccess: res => {
      setCurrentUser({ ...currenUser, ...res.data })
    },

    onError: (error: ErrorProps) => {
      if (error.response?.status === 403) {
        navigate(`${ROUTER.ADMIN}/${ROUTER.CHAT}`)
      }
    },
  })

  return (
    <Box width='100%' height='100%' display='flex' overflow='hidden' flexDirection='column'>
      {isLoading || isFetching ? (
        <Spinner center />
      ) : (
        <>
          <Header />
          <Body />
          {can_edit && <Footer />}
        </>
      )}
    </Box>
  )
}

export default Page
