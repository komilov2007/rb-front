import { request } from '@/configs/requests'

export const fcmToken = async (fb_token: string) =>
  await request.post('v2/firebase/generate/fb-token', { fb_token })
