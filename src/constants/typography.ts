import { defaultCreateTheme } from '@/configs/material'
import type { Palette } from '@mui/material/styles'
import { type TypographyOptions } from '@mui/material/styles/createTypography'

export interface TypographyProps {
  title: React.CSSProperties
  title10: React.CSSProperties
  title20: React.CSSProperties
  title30: React.CSSProperties
  title40: React.CSSProperties
  title50: React.CSSProperties
  title70: React.CSSProperties
  title80: React.CSSProperties
  title90: React.CSSProperties
  title100: React.CSSProperties
  title110: React.CSSProperties
  title120: React.CSSProperties
  title130: React.CSSProperties
  title140: React.CSSProperties
  title150: React.CSSProperties
  title160: React.CSSProperties
  text: React.CSSProperties
  text10: React.CSSProperties
  text20: React.CSSProperties
  text30: React.CSSProperties
  text40: React.CSSProperties
  text50: React.CSSProperties
  text60: React.CSSProperties
  text70: React.CSSProperties
  text80: React.CSSProperties
  text90: React.CSSProperties
  text100: React.CSSProperties
  text110: React.CSSProperties
  text120: React.CSSProperties
  text130: React.CSSProperties
  text140: React.CSSProperties
  text150: React.CSSProperties
  text160: React.CSSProperties
  text170: React.CSSProperties
  text180: React.CSSProperties
  text190: React.CSSProperties
  text200: React.CSSProperties
  text210: React.CSSProperties
  text220: React.CSSProperties
  text230: React.CSSProperties
  text240: React.CSSProperties
  text250: React.CSSProperties
  text260: React.CSSProperties
  text270: React.CSSProperties
  text280: React.CSSProperties
  text290: React.CSSProperties
  text300: React.CSSProperties
  text310: React.CSSProperties
  text320: React.CSSProperties
  text330: React.CSSProperties
  text340: React.CSSProperties
  status: React.CSSProperties
}

export interface TypographyPropsVariant {
  title: true
  title10: true
  title20: true
  title30: true
  title40: true
  title50: true
  title70: true
  title80: true
  title90: true
  title100: true
  title110: true
  title120: true
  title130: true
  title140: true
  title150: true
  title160: true
  title170: true
  title180: true
  text: true
  text10: true
  text20: true
  text30: true
  text40: true
  text50: true
  text60: true
  text70: true
  text80: true
  text90: true
  text100: true
  text110: true
  text120: true
  text130: true
  text140: true
  text150: true
  text160: true
  text170: true
  text180: true
  text190: true
  text200: true
  text210: true
  text220: true
  text230: true
  text240: true
  text250: true
  text260: true
  text270: true
  text280: true
  text290: true
  text300: true
  text310: true
  text320: true
  text330: true
  text340: true
  text350: true
  status: true
}

export const typography: (palette: Palette) => TypographyOptions = palette => ({
  fontFamily: 'var(--app-font, Onest, serif) !important',
  title: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: '0.35px',
    color: palette.allColors.BLACK30,
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
  title10: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  title20: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  title30: {
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  title40: {
    fontSize: '14px',
    fontWeight: 500,
    color: palette.allColors.BLACK30,
  },
  title50: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  title70: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
  },
  title80: {
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
  },
  title90: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
  },
  title100: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY30-D-GRAY20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  title110: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: 'normal',
    color: palette.allColors.BLACK140,
  },
  title120: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  title130: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 'normal',
  },
  title140: {
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: palette.allColors.BLACK30,
  },
  title150: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 'normal',
    color: palette.allColors.WHITE,
  },
  title160: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    color: palette.allColors.BLACK190,
  },
  title170: {
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '16px',
    color: palette.allColors.BLACK190,
  },
  title180: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '14px',
    color: palette.allColors.GRAY790,
  },
  text: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY30-D-GRAY20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  text10: {
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: 'normal',
    color: palette.allColors.BLACK30,
  },
  text20: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: '21px',
    color: palette.allColors.BLACK30,
  },
  text30: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '26px',
    color: 'var(--mui-palette-colors-L-GRAY100-D-GRAY20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  text40: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    color: 'var(--mui-palette-colors-L-GRAY160-D-GRAY20)',
  },
  text50: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
  },
  text60: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY100-D-GRAY20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  text70: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    color: 'var(--mui-palette-colors-L-GRAY200-D-GRAY20)',
  },
  text80: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'var(--mui-palette-colors-L-GRAY200-D-GRAY20)',
  },
  text90: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY260-D-GRAY20)',
  },
  text100: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '25px',
    letterSpacing: '0.049px',
    color: 'var(--mui-palette-colors-L-GRAY200-D-GRAY20)',
  },
  text110: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY100-D-GRAY20)',
  },
  text120: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 'normal',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  text130: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: 'normal',
    color: 'var(--mui-palette-colors-L-GRAY30-D-GRAY20)',
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  text140: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '17px',
    color: 'var(--mui-palette-colors-L-BLACK30-D-WHITE20)',
  },
  text150: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '160.5%',
    color: palette.allColors.BLACK100,
  },
  text160: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    color: palette.allColors.BLACK30,
  },
  text170: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 'normal',
    color: palette.allColors.WHITE,
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  text180: {
    fontSize: '16px',
    fontWeight: 300,
    maxWidth: '440px',
    lineHeight: '23px',
    letterSpacing: '0.216px',
    color: palette.allColors.WHITE30,
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  text190: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 'normal',
    color: palette.allColors.GREEN,
  },
  text200: {
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 'normal',
    color: palette.allColors.GRAY200,
  },
  text210: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '25px',
    letterSpacing: '0.056px',
    color: palette.allColors.BLACK140,
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  text220: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '25px',
    letterSpacing: '0.049px',
    color: palette.allColors.WHITE,
  },
  text230: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '25px',
    letterSpacing: '0.063px',
    color: palette.allColors.BLACK140,
  },
  text240: {
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: 'normal',
    color: palette.allColors.BLACK130,
    [defaultCreateTheme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  text250: {
    fontWeight: 500,
    fontSize: '14px',
    color: palette.colors['L-GRAY30-D-GRAY20'],
  },
  text260: {
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '20px',
    color: palette.allColors.BLACK30,
  },
  text270: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    letterSpacing: '0.35%',
    color: palette.allColors.GRAY30,
  },
  text280: {
    fontWeight: 300,
    fontSize: '8px',
    lineHeight: 'normal',
    color: palette.allColors.GRAY210,
  },
  text290: {
    fontWeight: 400,
    fontSize: '14px',
    maxWidth: '100%',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    lineHeight: 'normal',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    color: palette.allColors.BLACK30,
  },
  text300: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: palette.allColors.GRAY790,
  },
  text310: {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '16px',
    color: palette.allColors.GRAY800,
  },
  text320: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '100%',
    color: palette.allColors.GRAY840,
  },
  text330: {
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '100%',
    color: palette.allColors.GRAY30,
  },
  text340: {
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '100%',
    color: palette.allColors.BLACK30,
  },
  text350: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '120%',
    color: palette.allColors.WHITE,
  },
  status: {
    fontWeight: 500,
    fontSize: '10px',
    padding: '2px 5px',
    textAlign: 'center',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    lineHeight: 'normal',
    height: 'fit-content',
    color: palette.allColors.GREEN,
    backgroundColor: palette.allColors.GREEN40,
  },
})
