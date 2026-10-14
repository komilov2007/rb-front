import { useEffect } from 'react'
import type { HocProps } from '@/types/hoc'
import { getCurrentDomainMeta } from '@/constants/domain-themes'

export const HocMetaHandler = ({ children }: HocProps) => {
  useEffect(() => {
    const meta = getCurrentDomainMeta()
    const prevElements = document.head.querySelectorAll('[data-hoc-meta="true"]')
    prevElements.forEach(el => {
      el.remove()
    })

    const icoIcon = meta.icons?.find(icon => icon.type === 'image/x-icon')
    if (icoIcon) {
      const staticLinks = document.head.querySelectorAll(
        'link[rel="icon"]:not([data-hoc-meta]), link[rel="shortcut icon"]:not([data-hoc-meta])',
      )
      staticLinks.forEach(el =>
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        el.remove(),
      )
    }

    meta.icons?.forEach(icon => {
      const link = document.createElement('link')
      Object.entries(icon).forEach(([key, value]) => {
        link.setAttribute(key, value)
      })
      link.setAttribute('data-hoc-meta', 'true')
      document.head.appendChild(link)
    })

    if (icoIcon) {
      const shortcut = document.createElement('link')
      shortcut.setAttribute('rel', 'shortcut icon')
      shortcut.setAttribute('type', 'image/x-icon')
      shortcut.setAttribute('href', icoIcon.href)
      shortcut.setAttribute('data-hoc-meta', 'true')
      document.head.appendChild(shortcut)
    }

    let themeMeta = document.querySelector('meta[name="theme-color"]')
    if (!themeMeta) {
      themeMeta = document.createElement('meta')
      themeMeta.setAttribute('name', 'theme-color')
      document.head.appendChild(themeMeta)
    }
    themeMeta.setAttribute('content', meta.themeColor)
    themeMeta.setAttribute('data-hoc-meta', 'true')

    document.title = meta.appName
  }, [])

  return <>{children}</>
}
