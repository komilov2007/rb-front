const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL

const fSExt = ['Bytes', 'KB', 'MB', 'GB']

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov']

export const isVideo = (url: string) => {
  try {
    const pathname = new URL(url).pathname.toLowerCase()
    return VIDEO_EXTENSIONS.some(ext => pathname.endsWith(ext))
  } catch {
    return false
  }
}

export const getSize = (s: number) => {
  let fSize = s
  let i = 0
  while (fSize > 900) {
    fSize /= 1024
    i++
  }

  return `${Math.round(fSize * 100) / 100} ${fSExt[i]}`
}

export function extractKey(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null
  return url.startsWith(mediaBaseURL) ? url.slice(mediaBaseURL.length) : url
}
