import { lazy } from 'react'
import { ROUTER } from '@/constants/router'
import { createBrowserRouter } from 'react-router-dom'

const NotFound = lazy(async () => await import('@/pages/404'))

// LAYOUT
const Auth = lazy(async () => await import('@/layouts/auth'))
const Admin = lazy(async () => await import('@/layouts/admin'))

// AUTH
const Login = lazy(async () => await import('@/pages/auth/login'))
const RouterSignUp = lazy(async () => await import('@/pages/auth/sign-up'))
const Verification = lazy(async () => await import('@/pages/auth/verification'))
const ResetPassword = lazy(async () => await import('@/pages/auth/reset-password'))
const ForgotPassword = lazy(async () => await import('@/pages/auth/forgot-password'))

// ADMIN
const Dashboard = lazy(async () => await import('@/pages/admin/dashboard'))
const RouterOrders = lazy(async () => await import('@/pages/admin/orders'))
const RouterEmployees = lazy(async () => await import('@/pages/admin/employees'))
const Customers = lazy(async () => await import('@/pages/admin/customers'))
const RouterChat = lazy(async () => await import('@/pages/admin/chat'))
const Marketing = lazy(async () => await import('@/pages/admin/marketing'))
const RouterProducts = lazy(async () => await import('@/pages/admin/products'))
const RouterProfile = lazy(async () => await import('@/pages/admin/profile'))
const Payment = lazy(async () => await import('@/pages/admin/payment'))
const RouterPricingPlan = lazy(async () => await import('@/pages/admin/pricing-plan'))
const Branches = lazy(async () => await import('@/pages/admin/branches'))
const RouterPlatforms = lazy(async () => await import('@/pages/admin/platforms'))
const Delivery = lazy(async () => await import('@/pages/admin/delivery'))
const Market = lazy(async () => await import('@/pages/admin/market'))
const Settings = lazy(async () => await import('@/components/forms/settings'))
const UserPolicy = lazy(async () => await import('@/pages/user-policy'))

export const router = createBrowserRouter([
  {
    path: ROUTER.AUTH,
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: `${ROUTER.SIGN_UP}/*`,
        element: <RouterSignUp />,
      },
      {
        path: ROUTER.RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        path: ROUTER.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ROUTER.VERIFICATION,
        element: <Verification />,
      },
      {
        path: ROUTER.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: ROUTER.ADMIN,
    element: <Admin />,
    children: [
      {
        path: ROUTER.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: `${ROUTER.ORDERS}/*`,
        element: <RouterOrders />,
      },
      {
        path: `${ROUTER.CUSTOMERS}/*`,
        element: <Customers />,
      },
      {
        path: `${ROUTER.CHAT}/*`,
        element: <RouterChat />,
      },
      {
        path: `${ROUTER.MARKETING}/*`,
        element: <Marketing />,
      },
      {
        path: `${ROUTER.PRODUCTS}/*`,
        element: <RouterProducts />,
      },
      {
        path: `${ROUTER.EMPLOYEES}/*`,
        element: <RouterEmployees />,
      },
      {
        path: ROUTER.PAYMENT,
        element: <Payment />,
      },
      {
        path: `${ROUTER.PRICING_PLAN}/*`,
        element: <RouterPricingPlan />,
      },
      {
        path: ROUTER.BRANCHES,
        element: <Branches />,
      },

      {
        path: `${ROUTER.PLATFORMS}/*`,
        element: <RouterPlatforms />,
      },
      {
        path: ROUTER.DELIVERY,
        element: <Delivery />,
      },
      {
        path: `${ROUTER.ROBO_MARKET}/*`,
        element: <Market />,
      },
      {
        path: ROUTER.SETTINGS,
        element: <Settings variant='admin' />,
      },
      {
        path: `${ROUTER.PROFILE}/*`,
        element: <RouterProfile />,
      },
      {
        path: ROUTER.PUBLIC_OFFER,
        element: <UserPolicy variant='public-offer' />,
      },
      {
        path: ROUTER.PRIVACY_POLICY,
        element: <UserPolicy variant='privacy-policy' />,
      },
      {
        path: ROUTER.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
  {
    path: ROUTER.NOT_FOUND,
    element: <NotFound />,
  },
])
