import Box from '@mui/material/Box'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import type {} from '@mui/material/themeCssVarsAugmentation'
import { resolveDomainColors, resolveDomainFont } from '@/constants/domain-themes'
import { ReactComponent as IconStar } from '@/assets/icons/star.svg'
import { COLORS, LIGHT_COLORS, DARK_COLORS } from '@/constants/colors'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconRadioTrue } from '@/assets/icons/radio-true.svg'
import { ReactComponent as IconRadioFalse } from '@/assets/icons/radio-false.svg'
import { ReactComponent as IconCheckboxTrue } from '@/assets/icons/checkbox-true.svg'
import { ReactComponent as IconCheckboxFalse } from '@/assets/icons/checkbox-false.svg'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import {
  typography,
  type TypographyProps,
  type TypographyPropsVariant,
} from '@/constants/typography'
import {
  type ColorSystemOptions,
  type SupportedColorScheme,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles'

resolveDomainColors()
const domainFont = resolveDomainFont()

declare module '@mui/material/styles' {
  interface Palette {
    allColors: typeof COLORS
    colors: typeof LIGHT_COLORS
  }

  interface PaletteOptions {
    allColors: typeof COLORS
    colors: typeof LIGHT_COLORS
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants extends TypographyProps {}
  interface TypographyVariantsOptions extends TypographyProps {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends TypographyPropsVariant {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'contained-light': true
    'contained-red': true
    'contained-white': true
    'contained-white-solid': true
    'outlined-red': true
    'outlined-transparent': true
    'outlined-white': true
    'outlined-purple': true
    'outlined-green': true
    'contained-green': true
    'contained-blue': true
    'contained-black': true
    'contained-white-text-purple': true
    'text-gray': true
    'text-green': true
    'filled-red': true
    'solid-white': true
    telegram: true
    'filled-green': true
    generate: true
  }
  interface ButtonPropsSizeOverrides {
    extraLarge: true
    extraSmall: true
    mediumSmall: true
  }
  interface ButtonExtraProps {
    sizeExtraLarge: true
    sizeExtraSmall: true
    sizeMediumSmall: true
  }
  interface ButtonClasses {
    sizeExtraLarge: 'sizeExtraLarge'
    sizeExtraSmall: 'sizeExtraSmall'
    sizeMediumSmall: 'sizeMediumSmall'
  }
}

declare module '@mui/material/RadioGroup' {
  interface RadioGroupProps {
    error?: boolean
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    filled: true
    contained: true
    white: true
    outline: true
    gray: true
  }

  interface IconButtonOwnProps {
    radius?: string | number
  }
}

const colorSchemes: Partial<Record<SupportedColorScheme, ColorSystemOptions>> | undefined = {
  light: {
    palette: {
      allColors: COLORS,
      colors: LIGHT_COLORS,
      primary: {
        main: COLORS.PURPLE,
      },
      text: {
        primary: COLORS.BLACK,
      },
      background: {
        paper: COLORS.WHITE,
        default: COLORS.GRAY,
      },
      error: {
        light: COLORS.RED,
        main: COLORS.RED,
        dark: COLORS.RED,
      },
      TableCell: {
        border: COLORS.GRAY10,
      },
    },
  },
  dark: {
    palette: {
      allColors: COLORS,
      colors: DARK_COLORS,
      primary: {
        main: COLORS.PURPLE,
      },
      text: {
        primary: COLORS.BLACK,
      },
      background: {
        paper: COLORS.BLACK10,
        default: COLORS.BLACK,
      },
      error: {
        light: COLORS.RED,
        main: COLORS.RED,
        dark: COLORS.RED,
      },
      TableCell: {
        border: COLORS.BLACK20,
      },
    },
  },
}

export const defaultCreateTheme = extendTheme({})

export const theme = extendTheme({
  typography,
  colorSchemes,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: theme => ({
        textarea: {
          fontSize: '16px !important',
          fontWeight: '500 !important',
          color: `${theme.palette.colors['L-BLACK30-D-WHITE']} !important`,
        },
        'input::placeholder, textarea::placeholder , .placeholder': {
          opacity: '1 !important',
          color: `${theme.palette.colors['L-GRAY100-D-GRAY30']} !important`,
          fontSize: '16px !important',
          fontWeight: '400 !important',
        },
        '.Mui-disabled': {
          cursor: 'not-allowed !important',
        },
        '.MuiFormHelperText-root.Mui-error': {
          '&:first-letter': {
            textTransform: 'uppercase',
          },
        },
        '&.MuiPickersPopper-root': {
          zIndex: '10000 !important',
        },
        '&.Toastify__toast': {
          borderRadius: '8px !important',
          border: `1px solid ${theme.palette.colors['L-GRAY400-D-GRAY410']}`,
          background: `${theme.palette.colors['L-WHITE-D-GRAY180']}`,
          boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY120}`,
          color: `${theme.palette.colors['L-BLACK30-D-WHITE']}`,
          fontSize: '14px',
          fontWeight: '500',
          '.Toastify__close-button': {
            background: `${theme.palette.colors['L-GRAY30-D-GRAY20']} !important`,
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            svg: {
              width: '10px',
            },
          },
        },
      }),
    },
    MuiTypography: {
      styleOverrides: {
        noWrap(styles) {
          return {
            whiteSpace: 'initial',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: String(styles.ownerState['data-lines'] || '1'),
            WebkitBoxOrient: 'vertical',
          }
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: '14px',
          padding: '8px 14px',
          lineHeight: 'normal',
          color: theme.palette.colors['L-BLACK30-D-WHITE'],
          '.description': {
            opacity: 0.75,
            fontWeight: 400,
          },
        }),
      },
    },
    MuiRating: {
      defaultProps: {
        emptyIcon: <IconStar />,
        icon: (
          <Box
            display='flex'
            alignItems='center'
            sx={theme => ({
              svg: {
                path: {
                  fillOpacity: 1,
                  fill: theme.palette.allColors.YELLOW,
                },
              },
            })}
          >
            <IconStar />
          </Box>
        ),
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          return {
            svg: {
              g: {
                rect: {
                  stroke: ownerState?.error ? theme.palette.allColors.RED : undefined,
                },
              },
            },
          }
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          marginTop: '8px',
          borderRadius: '9px',
          background: theme.palette.allColors.WHITE,
          border: `1px solid ${theme.palette.allColors.GRAY210}`,
          boxShadow: `0px 2px 40px 0px ${theme.palette.allColors.GRAY80}`,
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          color: theme.palette.colors['L-BLACK30-D-WHITE20'],
        }),
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.mode === 'dark' ? theme.palette.allColors.GRAY40 : undefined,
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: 'off',
        inputProps: {
          autoComplete: 'off',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiLinearProgress: {
      variants: [
        {
          props: { variant: 'determinate' },
          style: {
            height: 5,
            borderRadius: 12,
          },
        },
      ],
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 'normal',
          textTransform: 'inherit',
          color: theme.palette.colors['L-GRAY200-D-GRAY20'],
          '&.Mui-selected': {
            opacity: '1',
            fontWeight: 500,
          },
          [theme.breakpoints.down('md')]: {
            fontSize: '14px',
          },
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        mark: {
          display: 'none',
        },
        rail: ({ theme }) => ({
          opacity: 1,
          borderRadius: '16px',
          backgroundColor: theme.palette.allColors.GRAY130,
        }),
        track: ({ theme }) => ({
          border: 'none',
          backgroundColor: theme.palette.allColors.GREEN,
        }),
        thumb: ({ theme }) => ({
          width: '24px',
          height: '24px',
          backgroundColor: theme.palette.allColors.WHITE,
          border: `6px solid ${theme.palette.allColors.GREEN}`,
        }),
        markLabel: ({ theme }) => ({
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: 'normal',
          color: theme.palette.allColors.BLACK30,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          '.MuiTabs-flexContainer': {
            gap: '35px',
          },
          '.MuiTabs-indicator': {
            zIndex: 999,
            height: '3px',
            background: theme.palette.allColors.PURPLE,
          },
          '::after': {
            left: 0,
            bottom: 0,
            width: '100%',
            content: '""',
            height: '1px',
            position: 'absolute',
            backgroundColor: theme.palette.colors['L-GRAY10-D-BLACK20'],
          },
        }),
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          '.MuiStepLabel-label:not(.Mui-active)': {
            marginTop: '20px !important',
          },
          '.MuiStepLabel-label': {
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: 'normal',
            fontWeight: '400',
            color: theme.palette.allColors.GRAY30,
            display: 'flex',
            flexDirection: 'column',
          },
          '.MuiStepLabel-label.Mui-active': {
            color: theme.palette.allColors.PURPLE,
          },
          '.MuiStepLabel-label.Mui-completed': {
            color: theme.palette.allColors.BLACK30,
          },
        }),
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: theme => ({
            borderRadius: '24px',
            backgroundImage: 'none',
            [theme.breakpoints.down('md')]: {
              borderRadius: '14px',
            },
          }),
        },
        BackdropProps: {
          sx: theme => ({
            backgroundColor: theme.palette.colors['L-GRAY110-D-BLUE30'],
          }),
        },
      },
      styleOverrides: {
        root: {
          zIndex: 9000,
        },
      },
    },
    MuiSwipeableDrawer: {
      defaultProps: {
        sx: theme => ({
          zIndex: 9000,
          '&.small': {
            '.MuiPaper-root': {
              maxWidth: '347px',
              backgroundImage: 'none',
              minWidth: 'min(40vw, 347px)',
              [theme.breakpoints.down('md')]: {
                width: '100%',
                maxWidth: '100%',
                minWidth: '100%',
              },
            },
          },
          '&.fit': {
            '.MuiPaper-root': {
              maxWidth: '50vw',
              backgroundImage: 'none',
              minWidth: 'min(50vw, 700px)',
              [theme.breakpoints.down('md')]: {
                width: '100%',
                maxWidth: '100%',
                minWidth: '100%',
              },
            },
          },
        }),
        ModalProps: {
          keepMounted: false,
        },
        BackdropProps: {
          sx: theme => ({
            backgroundColor: theme.palette.colors['L-GRAY110-D-BLUE30'],
          }),
        },
        PaperProps: {
          sx: theme => ({
            maxWidth: '592px',
            backgroundImage: 'none',
            minWidth: 'min(42vw, 592px)',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              maxWidth: '100%',
              minWidth: '100%',
            },
            '.container': {
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
              flexDirection: 'column',
            },
            '.content': {
              width: '100%',
              overflowY: 'auto',
              padding: '5px 32px 50px',
              height: 'calc(100% - 127px)',
            },
            '.footer': {
              bottom: 0,
              width: '100%',
              padding: '17px',
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: theme.palette.allColors.WHITE,
              borderTop: `1px solid ${theme.palette.colors['L-GRAY10-D-GRAY190']}`,
              boxShadow: `0px -1px 25px 0px ${theme.palette.colors['L-GRAY120-D-GRAY190']}`,
            },
          }),
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        popupIcon: <IconDirectionDown />,
      },
      styleOverrides: {
        popper: {
          zIndex: 90000,
        },
        listbox: {
          maxHeight: '300px',
        },
        inputRoot: {
          paddingLeft: '0 !important',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.radius && {
            padding: 0,
            borderRadius:
              typeof ownerState.radius === 'number' ? `${ownerState.radius}px` : ownerState.radius,
            '.MuiTouchRipple-root .MuiTouchRipple-child': {
              borderRadius:
                typeof ownerState.radius === 'number'
                  ? `${ownerState.radius}px`
                  : ownerState.radius,
            },
          }),
        }),
      },
      variants: [
        {
          props: { color: 'contained' },
          style: ({ theme }) => ({
            p: 0,
            width: 32,
            height: 32,
            color: theme.palette.allColors.BLACK30,
            backgroundColor: theme.palette.allColors.WHITE,
            boxShadow: `0px 2px 6px 0px ${theme.palette.allColors.GRAY450}`,
            '&:hover': {
              backgroundColor: theme.palette.allColors.WHITE,
            },
          }),
        },
        {
          props: { color: 'filled' },
          style: ({ theme }) => ({
            p: 0,
            width: 42,
            height: 42,
            color: theme.palette.allColors.WHITE,
            backgroundColor: theme.palette.allColors.PURPLE,
            '&:hover': {
              backgroundColor: theme.palette.allColors.PURPLE,
            },
            [theme.breakpoints.down('md')]: {
              width: 36,
              height: 36,
            },
          }),
        },
        {
          props: { color: 'white' },
          style: ({ theme }) => ({
            width: 38,
            height: 38,
            borderRadius: '6px',
            padding: '0 !important',
            backgroundColor: theme.palette.allColors.WHITE,
            border: `1px solid ${theme.palette.allColors.GRAY270}`,
            '.MuiTouchRipple-root .MuiTouchRipple-child': {
              borderRadius: '6px',
            },
            '&:hover': {
              backgroundColor: theme.palette.allColors.WHITE,
            },
          }),
        },
        {
          props: { color: 'gray' },
          style: ({ theme }) => ({
            width: 42,
            height: 42,
            borderRadius: '8px',
            padding: '0 !important',
            color: theme.palette.allColors.BLACK30,
            backgroundColor: theme.palette.allColors.GRAY,
            '.MuiTouchRipple-root .MuiTouchRipple-child': {
              borderRadius: '6px',
            },
            '&:hover': {
              backgroundColor: theme.palette.allColors.GRAY,
            },
          }),
        },
        {
          props: { color: 'outline' },
          style: ({ theme }) => ({
            width: 42,
            height: 42,
            borderRadius: '5px',
            padding: '0 !important',
            backgroundColor: theme.palette.allColors.PURPLE260,
            border: `1px solid ${theme.palette.allColors.PURPLE270}`,
            '.MuiTouchRipple-root .MuiTouchRipple-child': {
              borderRadius: '5px',
            },
            '&:hover': {
              backgroundColor: theme.palette.allColors.PURPLE260,
            },
          }),
        },
      ],
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            padding: '0 10px',
            backgroundColor: theme.palette.allColors.TRANSPARENT,
            '& .MuiTableRow-root .MuiTableCell-root': {
              borderBottom: 'none',
            },
            '& .MuiTableRow-root:not(:first-of-type):not(.sub-row)': {
              position: 'relative',
              '&:has(.row-expanded)': {
                '::after': {
                  top: 0,
                  left: '10px',
                  content: '""',
                  height: '2px',
                  display: 'block',
                  position: 'absolute',
                  width: 'calc(100% - 20px)',
                  backgroundColor: theme.palette.allColors.PURPLE,
                },
              },
              '::after': {
                top: 0,
                left: '10px',
                content: '""',
                height: '1px',
                display: 'block',
                position: 'absolute',
                width: 'calc(100% - 20px)',
                backgroundColor: theme.palette.colors['L-GRAY10-D-BLACK20'],
              },
            },
          }
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '13px',
          lineHeight: 'normal',
          backgroundColor: theme.palette.allColors.TRANSPARENT,
        }),
        head: ({ theme }) => ({
          height: '42px',
          fontWeight: 300,
          padding: '0 10px',
          color: theme.palette.colors['L-GRAY30-D-GRAY20'],
          backgroundColor: theme.palette.colors['L-GRAY140-D-GRAY150'],
          borderTop: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}`,
          '&::first-letter': {
            textTransform: 'uppercase',
          },
        }),
        body: ({ theme }) => ({
          height: '60px',
          fontWeight: 400,
          padding: '0 10px',
          color: theme.palette.colors['L-BLACK30-D-WHITE20'],
        }),
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <IconCheckboxFalse />,
        checkedIcon: <IconCheckboxTrue />,
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <IconRadioFalse />,
        checkedIcon: <IconRadioTrue />,
      },
    },
    MuiChip: {
      defaultProps: {
        deleteIcon: <IconRemove />,
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            borderRadius: '6px',
            backgroundColor: theme.palette.allColors.PURPLE140,
            border: `0.5px solid ${theme.palette.allColors.PURPLE}`,
          }),
        },
        {
          props: { variant: 'filled' },
          style: () => ({
            height: '36px',
            borderRadius: '5px',
            background: '#F9F9FC',
            border: '1px solid #E3E4E7',
          }),
        },
      ],
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        sizeExtraLarge: {
          height: 52,
          borderRadius: '12px',
        },
        sizeLarge: {
          height: 46,
          borderRadius: '8px',
        },
        sizeMedium: {
          height: 42,
        },
        sizeSmall: {
          height: 38,
        },
        sizeExtraSmall: {
          height: 29,
        },
        root: ({ theme }) => ({
          fontWeight: 500,
          fontSize: '14px',
          boxShadow: 'none',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          textTransform: 'inherit',
          [theme.breakpoints.down('md')]: {
            fontSize: '12px',
          },
          ':hover': {
            boxShadow: 'none',
          },
          '&.MuiButton-sizeMedium': {
            borderRadius: '5px',
          },
          '&.MuiButton-sizeMediumSmall': {
            height: 40,
            borderRadius: '8px',
          },
          '&.MuiButton-sizeExtraSmall': {
            height: 29,
            fontSize: '13px',
          },
          '&.MuiLoadingButton-loading.Mui-disabled': {
            color: `${theme.palette.allColors.TRANSPARENT} !important`,
          },
          '&.Mui-disabled:not(.MuiLoadingButton-loading)': {
            background: theme.palette.allColors.GRAY,
          },
          '&.MuiLoadingButton-loading': {
            '.MuiCircularProgress-root': {
              width: '18px !important',
              height: '18px !important',
            },
          },
        }),
      },
      variants: [
        {
          props: { variant: 'contained-light' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.PURPLE,
            background: theme.palette.allColors.PURPLE30,
            '.MuiLoadingButton-loadingIndicator': {
              color: `${theme.palette.allColors.PURPLE}`,
            },
          }),
        },
        {
          props: { variant: 'contained' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.PURPLE80,
            '.MuiLoadingButton-loadingIndicator': {
              color: `${theme.palette.allColors.WHITE}`,
            },
          }),
        },
        {
          props: { variant: 'contained-white' },
          style: ({ theme }) => ({
            fontSize: '13px',
            fontWeight: 500,
            height: '36px',
            lineHeight: 'normal',
            flexDirection: 'column',
            borderRadius: '8px !important',
            color: theme.palette.allColors.BLACK30,
            background: theme.palette.allColors.WHITE,
            boxShadow: `0px 0px 8px 0px ${theme.palette.allColors.GRAY80}`,
            '.MuiLoadingButton-loadingIndicator': {
              color: `${theme.palette.allColors.BLACK30}`,
            },
            ':hover': {
              background: theme.palette.allColors.WHITE,
              boxShadow: `0px 0px 8px 0px ${theme.palette.allColors.GRAY80}`,
            },
          }),
        },
        {
          props: { variant: 'contained-white-solid' },
          style: ({ theme }) => ({
            height: '40px',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: 'normal',
            flexDirection: 'column',
            borderRadius: '8px !important',
            color: theme.palette.allColors.BLACK30,
            background: theme.palette.allColors.WHITE,
            boxShadow: `0px 1px 3px 0px ${theme.palette.allColors.GRAY540}`,
            '.MuiLoadingButton-loadingIndicator': {
              color: `${theme.palette.allColors.BLACK30}`,
            },
            ':hover': {
              background: theme.palette.allColors.WHITE,
              boxShadow: `0px 1px 3px 0px ${theme.palette.allColors.GRAY540}`,
            },
          }),
        },
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.PURPLE60,
            background: theme.palette.colors['L-PURPLE30-D-PURPLE240'],
            border: `1px solid ${theme.palette.colors['L-PURPLE40-D-WHITE40']}`,
            ':hover': {
              border: `1px solid ${theme.palette.colors['L-PURPLE40-D-WHITE40']}`,
            },
          }),
        },
        {
          props: { variant: 'outlined-purple' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.PURPLE10,
            background: theme.palette.allColors.TRANSPARENT,
            border: `1px solid ${theme.palette.allColors.PURPLE10}`,
            ':hover': {
              border: `1px solid ${theme.palette.allColors.PURPLE10}`,
            },
          }),
        },
        {
          props: { variant: 'outlined-green' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.PURPLE,
            background: theme.palette.allColors.TRANSPARENT,
            border: `1px solid ${theme.palette.allColors.PURPLE}`,
            ':hover': {
              border: `1px solid ${theme.palette.allColors.PURPLE}`,
            },
          }),
        },
        {
          props: { variant: 'outlined-red' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.RED,
            background: theme.palette.allColors.TRANSPARENT,
            border: `1px solid ${theme.palette.allColors.RED}`,
            ':hover': {
              border: `1px solid ${theme.palette.allColors.RED}`,
            },
          }),
        },
        {
          props: { variant: 'outlined-transparent' },
          style: ({ theme }) => ({
            background: theme.palette.allColors.TRANSPARENT,
            color: theme.palette.colors['L-GRAY30-D-GRAY20'],
            border: `1px solid ${theme.palette.colors['L-GRAY30-D-GRAY20']}`,
            ':hover': {
              border: `1px solid ${theme.palette.colors['L-GRAY30-D-GRAY20']}`,
            },
          }),
        },
        {
          props: { variant: 'outlined-white' },
          style: ({ theme }) => ({
            color: theme.palette.colors['L-GRAY30-D-GRAY20'],
            background: theme.palette.colors['L-WHITE-D-BLACK10'],
            border: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}`,
            ':hover': {
              border: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}`,
            },
          }),
        },
        {
          props: { variant: 'contained-red' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.RED,
            ':hover': {
              background: theme.palette.allColors.RED,
            },
          }),
        },
        {
          props: { variant: 'contained-blue' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.BLUE50,
            ':hover': {
              background: theme.palette.allColors.BLUE50,
            },
          }),
        },
        {
          props: { variant: 'contained-black' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.BLACK30,
            ':hover': {
              background: theme.palette.allColors.BLACK30,
            },
          }),
        },
        {
          props: { variant: 'contained-green' },
          style: ({ theme }) => ({
            background: theme.palette.allColors.GREEN,
            color: theme.palette.colors['L-WHITE-D-GRAY40'],
            ':hover': {
              background: theme.palette.allColors.GREEN,
            },
          }),
        },
        {
          props: { variant: 'telegram' },
          style: ({ theme }) => ({
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.BLUE20,
            ':hover': {
              background: theme.palette.allColors.BLUE20,
            },
          }),
        },
        {
          props: { variant: 'text-gray' },
          style: ({ theme }) => ({
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 'normal',
            color: theme.palette.allColors.GRAY30,
          }),
        },
        {
          props: { variant: 'filled-red' },
          style: ({ theme }) => ({
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 'normal',
            color: theme.palette.allColors.RED,
            backgroundColor: theme.palette.allColors.RED20,
            ':hover': {
              backgroundColor: theme.palette.allColors.RED20,
            },
          }),
        },
        {
          props: { variant: 'filled-green' },
          style: ({ theme }) => ({
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 'normal',
            color: theme.palette.allColors.GREEN,
            backgroundColor: theme.palette.allColors.GREEN20,
            ':hover': {
              backgroundColor: theme.palette.allColors.GREEN20,
            },
          }),
        },
        {
          props: { variant: 'text-green' },
          style: ({ theme }) => ({
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 'normal',
            color: theme.palette.allColors.GREEN,
          }),
        },
        {
          props: { variant: 'solid-white' },
          style: ({ theme }) => ({
            borderRadius: '4px',
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.TRANSPARENT,
            border: `1px solid ${theme.palette.allColors.WHITE}`,
            ':hover': {
              border: `1px solid ${theme.palette.allColors.WHITE}`,
            },
          }),
        },
        {
          props: { variant: 'contained-white-text-purple' },
          style: ({ theme }) => ({
            fontSize: '14px',
            borderRadius: '4px',
            color: theme.palette.allColors.PURPLE,
            background: theme.palette.allColors.WHITE,
            ':hover': {
              color: theme.palette.allColors.PURPLE,
              background: theme.palette.allColors.WHITE,
            },
          }),
        },
        {
          props: { variant: 'generate' },
          style: ({ theme }) => ({
            height: '34px',
            fontWeight: 500,
            fontSize: '12px',
            borderRadius: '40px !important',
            color: theme.palette.allColors.GRAY860,
            border: `4px solid ${theme.palette.allColors.TRANSPARENT}`,
            background:
              'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4FFFB0 0%, #4FB3FF 25%, #6B73FF 50%, #9F40FF 75%, #FF40BF 100%) border-box',
            ':hover': {
              background:
                'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4FFFB0 0%, #4FB3FF 25%, #6B73FF 50%, #9F40FF 75%, #FF40BF 100%) border-box',
            },
          }),
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: 999999999999999,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
        },
        label: ({ theme }) => ({
          fontWeight: '300',
          fontSize: '14px',
          lineHeight: 'normal',
          color: theme.palette.allColors.BLACK30,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(0, -25px) scale(1)',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          ':has(label.MuiInputLabel-root)': {
            marginTop: '25px  !important',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: 46,
          '&.MuiInputBase-sizeSmall': {
            height: 42,
          },
          backgroundColor: theme.palette.colors['L-GRAY-D-GRAY40'],
          'input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active':
            {
              fontWeight: 500,
              fontSize: '14px',
              borderRadius: '0 8px 8px 0',
              WebkitTextFillColor: `${theme.palette.colors['L-BLACK30-D-WHITE']} !important`,
              WebkitBoxShadow: `0 0 0 30px ${theme.palette.colors['L-GRAY-D-GRAY40']} inset !important`,
              boxShadow: `0 0 0 30px ${theme.palette.colors['L-GRAY-D-GRAY40']} inset !important`,
              backgroundColor: theme.palette.colors['L-GRAY-D-GRAY40'],
            },
          ':has(.MuiInputAdornment-positionStart)': {
            paddingLeft: '20px !important',
            input: {
              paddingLeft: '0 !important',
            },
          },
          ':has(.MuiInputAdornment-positionEnd)': {
            paddingRight: '8px !important',
            input: {
              paddingRight: '0 !important',
            },
          },
          fieldset: {
            legend: {
              display: 'none',
            },
          },
          input: {
            padding: '0 20px !important',
            fontSize: '16px',
            fontWeight: '500',
            color: `${theme.palette.colors['L-BLACK30-D-WHITE']} !important`,
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginLeft: 0,
          fontSize: '12px',
          fontWeight: 400,
          color: theme.palette.allColors.RED,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '8px',
          '&.MuiInputBase-sizeSmall': {
            borderRadius: '5px',
          },
          '& fieldset': {
            top: 0,
            borderWidth: '1px',
            borderColor: theme.palette.allColors.GRAY60,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.allColors.PURPLE} !important`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: `${theme.palette.allColors.PURPLE} !important`,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: `${theme.palette.allColors.RED} !important`,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '7px 14px',
        },
      },
      defaultProps: {
        MenuProps: {
          style: { zIndex: 9500, maxHeight: '300px' },
        },
        IconComponent: props => (
          <Box
            {...props}
            sx={{
              width: '35px',
              height: '24px',
              display: 'flex',
              right: '6px !important',
              justifyContent: 'flex-end',
              top: 'calc(50% - 12px) !important',
              '&.MuiSelect-iconOpen': {
                borderLeft: 'none',
                justifyContent: 'flex-start',
              },
            }}
          >
            <IconDirectionDown />
          </Box>
        ),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.colors['L-GRAY10-D-BLACK20'],
        }),
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          height: 22,
          padding: '0',
          width: 36.19,
          marginRight: '9px',
          '& .MuiSwitch-switchBase': {
            margin: '1.35px 1px',
            padding: 0,
            transitionDuration: '300ms',
            '&.MuiSwitch-switchBase.Mui-checked': {
              right: '10px',
            },
            '&.Mui-checked': {
              transform: 'translateX(12px)',
              color: theme.palette.allColors.WHITE,
              '& + .MuiSwitch-track': {
                border: 0,
                opacity: 1,
                background: theme.palette.allColors.GREEN10,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: theme.palette.allColors.GRAY50,
            },
            '&.Mui-focusVisible.Mui-checked .MuiSwitch-thumb': {
              color: theme.palette.allColors.WHITE,
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: theme.palette.allColors.WHITE,
            },
          },
          '& .MuiSwitch-thumb': {
            width: 19.16,
            height: 19.16,
            boxSizing: 'border-box',
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            borderRadius: '20px',
            backgroundColor: theme.palette.allColors.GRAY90,
            transition: theme.transitions.create(['background-color'], {
              duration: 500,
            }),
          },
          '& .Mui-disabled+.MuiSwitch-track': {
            opacity: '0.5 !important',
          },
        }),
      },
    },
  },
})
