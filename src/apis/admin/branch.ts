import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import { type PositionBranchProps } from '@/types/position'
import type {
  BranchProps,
  BranchAllProps,
  BranchListProps,
  BranchDetailProps,
} from '@/types/branch'

export const getBranches = async <T>(params: T) => {
  const user = getUser()
  return await request<List<BranchListProps>>(`v2/branch/list/${user.shop}`, { params })
}

export const createBranch = async <T>(data: T) => {
  const user = getUser()
  return await request.post<BranchProps>('v2/branch/create', { ...data, shop: user.shop })
}

export const updateBranch = async <T>(data: T, id: string) => {
  const user = getUser()
  return await request.put<BranchProps>(`v2/branch/${id}/update`, { ...data, shop: user.shop })
}

export const updateBranchStatus = async (id: number) =>
  await request.post(`v2/branch/${id}/update/status`)

export const deleteBranch = async (id: number) => await request.delete(`v2/branch/${id}/delete`)

export const positionBranch = async (data: PositionBranchProps) =>
  await request.post(`v2/branch/${data.id}/change/position`, {
    above_branch: data.above_branch,
  })

export const getBranchDetail = async (id?: number) =>
  await request<BranchDetailProps>(`v2/branch/${id}/detail`)

export const getBranchAll = async () => {
  const user = getUser()
  return await request<BranchAllProps[]>(`v2/branch/list/select/${user.shop}`)
}
