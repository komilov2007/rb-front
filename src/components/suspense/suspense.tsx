import { Spinner } from '@/components/spinner'
import { Suspense as ReactSuspense, type ReactNode } from 'react'

interface ISuspense {
  children: ReactNode
}

export const Suspense = ({ children }: ISuspense) => (
  <ReactSuspense fallback={<Spinner center />}>{children}</ReactSuspense>
)
