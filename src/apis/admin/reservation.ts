import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  ReservationProps,
  ReservationStatsProps,
  ReservationBranchProps,
} from '@/types/reservation'

export const getReservations = async <T>(params: T) => {
  const user = getUser()
  return await request<List<ReservationProps>>(`v2/reservation/list/${user.shop}`, { params })
}

export const getReservationStats = async <T>(params: T) => {
  const user = getUser()
  return await request<ReservationStatsProps>(`v2/reservation/stats/${user.shop}`, { params })
}

export const getReservationDetail = async (id?: number) =>
  await request<ReservationProps>(`v2/reservation/${id}/detail`)

export const updateReservationStatus = async <T>(data: T, id: number) =>
  await request.patch<ReservationProps>(`v2/reservation/${id}/update/status`, data)

export const getReservationBranches = async () => {
  const user = getUser()
  return await request<ReservationBranchProps[]>(`v2/branch/list/all/${user.shop}`)
}
