import { type SxProps } from '@mui/material/styles'

const stringToColor = (string: string) => {
  let hash = 0
  let i
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  return color
}

export const stringAvatar = (name: string, sx?: SxProps) => {
  const user = name.split(' ')
  return {
    sx: {
      bgcolor: stringToColor(name),
      ...sx,
    },
    children: user?.length > 1 ? `${user[0][0]}${user[1][0]}` : user.length === 1 ? user[0][0] : '',
  }
}
