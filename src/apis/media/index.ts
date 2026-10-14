import { request } from '@/configs/requests'
import { type MediaProps } from '@/types/media'

export const uploadMedia = async <T>(data: T) =>
  await request.post<MediaProps>('v3/media/files', data)

export const uploadMedias = async <T>(data: T) =>
  await request.post<MediaProps>('v3/media/files/bulk-upload', data)
