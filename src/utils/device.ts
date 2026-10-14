export const isMobileDevice = () => {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  const isAndroid = /android/i.test(userAgent)
  const isIOS = /iphone|ipad|ipod/i.test(userAgent)
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent)

  return {
    isIOS,
    isMobile,
    isAndroid,
  }
}
