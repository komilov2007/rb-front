export const phoneFormat = (phone: string) => {
  return `+998${phone.replace(/\s/g, '')}`
}
