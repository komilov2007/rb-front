export const udapteViewportMeta = (scale: number) => {
  const meta = document.createElement('meta')
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', `width=device-width, initial-scale=${scale}`)
  document.head.appendChild(meta)
}
