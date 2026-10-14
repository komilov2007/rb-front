import { Hoc } from './hoc'
import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import { schemaChat, type SchemaTypeChat } from '@/utils/schema'
import { HocLimit } from '@/hocs/hoc-limit'

const Home = lazy(async () => await import('./pages/home'))
const Chat = lazy(async () => await import('./pages/chat'))
const NotFound = lazy(async () => await import('@/pages/404'))

const Router = () => {
  const form = useForm<SchemaTypeChat>({
    mode: 'onChange',
    resolver: yupResolver(schemaChat),
    defaultValues: schemaChat.cast({}),
  })

  return (
    <FormProvider {...form}>
      <Hoc>
        <Routes>
          <Route
            path='/'
            element={
              <HocLimit>
                <Home />
              </HocLimit>
            }
          >
            <Route path={ROUTER.CHAT_ID} element={<Chat />} />
          </Route>
          <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Hoc>
    </FormProvider>
  )
}

export default Router
