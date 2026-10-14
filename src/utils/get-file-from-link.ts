function getFilenameFromContentDisposition(res: Response) {
  let filename = null

  const disposition = res.headers.get('content-disposition')

  if (disposition?.includes('attachment')) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    const matches = filenameRegex.exec(disposition)
    if (matches?.[1]) {
      filename = matches[1].replace(/['"]/g, '')
      // Sometimes the filename comes in a URI encoded format so decode it
      filename = decodeURIComponent(filename)
      // Sometimes the filename starts with UTF-8, remove that
      filename = filename.replace(/^UTF-8/i, '').trim()
    }
  }

  return filename
}

export async function getFileFromLink(url: string) {
  const fileRes = await fetch(url)
  const blob = await fileRes.blob()

  let fileName = getFilenameFromContentDisposition(fileRes)
  if (!fileName) {
    fileName = url.split('/').pop() as string
  }

  const file = new File([blob], fileName, {
    type: blob.type,
  })

  return file
}
