import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type { ReviewProps } from '@/types/review'

export const getReviews = async <T>(params: T) => {
  const user = getUser()
  return await request<List<ReviewProps>>(`v3/admin/products/shop/${user.shop}/reviews`, {
    params,
  })
}

export const deleteReview = async (id: number) => await request.delete(`v3/products/reviews/${id}`)

export const answerComment = async <T>(data: T, id: number) => {
  return await request.post<ReviewProps>(`v3/admin/products/reviews/${id}/reply`, data)
}
