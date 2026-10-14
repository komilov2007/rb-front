import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { Route, Routes } from 'react-router-dom'
import { HocLimit } from '@/hocs/hoc-limit'

const Home = lazy(async () => await import('./pages/home'))
const NotFound = lazy(async () => await import('@/pages/404'))
const Create = lazy(async () => await import('./pages/create'))
const Detail = lazy(async () => await import('./pages/detail'))

const Router = () => (
  <Routes>
    <Route
      index
      element={
        <HocLimit>
          <Home />
        </HocLimit>
      }
    />
    <Route path={ROUTER.MARKETING_CREATE_MAILING} element={<Create />} />
    <Route path={ROUTER.MAILING_ID} element={<Detail />} />
    <Route path={ROUTER.NOT_FOUND} element={<NotFound />} />
  </Routes>
)

export default Router
