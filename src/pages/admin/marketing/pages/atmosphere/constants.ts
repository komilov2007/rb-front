import { MAX_FILE_SIZE10 } from '@/constants/media'

export const ATMOSPHERE_MAX_FILE_SIZE = MAX_FILE_SIZE10

export const ATMOSPHERE_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png']

const hasExtension = (file: File, extensions: string[]) =>
  extensions.includes(file.name.split('.').pop()?.toLowerCase() ?? '')

/** Returns a translation key describing why the file is rejected, or null if it is valid. */
export const validateAtmosphereFile = (file: File) => {
  if (!hasExtension(file, ATMOSPHERE_IMAGE_EXTENSIONS)) return 'atmosphere_image_invalid_format'
  if (file.size > ATMOSPHERE_MAX_FILE_SIZE) return 'image_size_exceeds_10mb_limit'
  return null
}
