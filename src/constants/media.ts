export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const MAX_FILE_SIZE10 = 10 * 1024 * 1024
export const IMAGES = ['jpg', 'png', 'jpeg']
export const DOCUMENTS = ['docx', 'pdf', 'csv', 'xlsx']
export const VIDEO = ['mp4', 'webm']

/**
 * These must be real MIME types, not `application/<extension>`. Deriving them
 * from the extension arrays produced `image/jpg`, `application/docx`,
 * `application/csv` and `application/xlsx` — none of which exist. Android built
 * an EXTRA_MIME_TYPES filter from them and showed an empty file list; iOS failed
 * to resolve a UTType and greyed everything out.
 *
 * HEIC is deliberately absent: with `image/jpeg` on the accept list iOS
 * transcodes camera photos to JPEG, which the backend already handles. Adding
 * HEIC here would let users pick files the `IMAGES` extension check rejects.
 */
export const ACCEPT_IMAGES = 'image/jpeg, image/png'
export const ACCEPT_VIDEOS = 'video/mp4, video/webm'
export const ACCEPT_DOCUMENTS = [
  'application/pdf',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
].join(', ')
export const ACCEPT_EXCEL = [
  '.xlsx',
  '.xls',
  '.csv',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
].join(', ')

const baseURLPoster = import.meta.env.VITE_API_POSTER_BASE_URL
const baseURLIIKO = import.meta.env.VITE_API_IIKO_BASE_URL

export const MEDIA_CORS_SERVIRES: string[] = [
  baseURLPoster,
  'https://16a9564f-f8ec-42ba-a998-3027aa809e50.selstorage.ru',
  'https://cdn.clopos.com',
]
