import type { Dayjs } from 'dayjs'
import type { SwitchProps } from '@mui/material/Switch'
import type { MaskedInputProps } from 'react-text-mask'
import type { Theme, SxProps } from '@mui/material/styles'
import type { CheckboxProps } from '@mui/material/Checkbox'
import type { TextFieldProps } from '@mui/material/TextField'
import type { MuiOtpInputProps } from 'mui-one-time-password-input'
import type { SelectProps as MuiSelectProps } from '@mui/material/Select'
import type { FormControlLabelProps } from '@mui/material/FormControlLabel'
import type { TimePickerProps, DateTimePickerProps } from '@mui/x-date-pickers'
import type { ReactNode, DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import type {
  Path,
  Control,
  FieldValues,
  UseControllerProps,
  UseFormSetValue,
} from 'react-hook-form'

export interface OptionProps {
  value: string | number
  label: string | number
  description?: string | null
}

export interface ControlProps<T extends FieldValues> extends UseControllerProps<T> {
  name: Path<T>
  control: Control<T>
}

export type InputProps<T extends FieldValues> = {
  buttonContent?: ReactNode
} & Omit<TextFieldProps, 'variant' | 'id'> &
  ControlProps<T>

export type InputPasswordProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'type' | 'autoComplete' | 'id'
> &
  ControlProps<T>

export type InputPriceFormatProps<T extends FieldValues> = ControlProps<T> &
  Omit<TextFieldProps, 'type' | 'autoComplete' | 'id'>

export type InputMaskProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'autoComplete' | 'variant' | 'id'
> &
  Omit<MaskedInputProps, 'render'> &
  ControlProps<T>

export type InputPhoneProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'autoComplete' | 'variant' | 'id' | 'type'
> &
  Omit<MaskedInputProps, 'render' | 'mask' | 'type'> &
  ControlProps<T>

export type InputCheckboxProps<T extends FieldValues> = Exclude<CheckboxProps, 'sx'> &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement' | 'sx' | 'disabled'> &
  ControlProps<T> & {
    error?: boolean
  }

export type InputSwicthProps<T extends FieldValues> = Exclude<SwitchProps, 'sx'> &
  Pick<FormControlLabelProps, 'label' | 'labelPlacement' | 'sx' | 'disabled'> &
  ControlProps<T>

export type InputOtpProps<T extends FieldValues> = MuiOtpInputProps & ControlProps<T>
export type InputTimePickerProps<T extends FieldValues> = TimePickerProps<Dayjs> & ControlProps<T>
export type InputDateProps<T extends FieldValues> = DateTimePickerProps<Dayjs> & ControlProps<T>
export type InputTextareaProps<T extends FieldValues> = {
  disabled?: boolean
  sx?: SxProps<Theme>
  labelMinimum?: number | string
  label?: string | ReactNode
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  ControlProps<T>

export type InputTextEditorProps<T extends FieldValues> = ControlProps<T> & {
  label?: string
  maxLength?: string
  placeholder?: string
}

export type SelectProps<T extends FieldValues> = Omit<
  MuiSelectProps,
  'value' | 'renderValue' | 'variant' | 'defaultValue'
> & {
  options: OptionProps[]
  placeholder?: string
  loading?: boolean
} & ControlProps<T>

export type SelectCategoryProps<T extends FieldValues> = Omit<
  MuiSelectProps,
  'value' | 'renderValue' | 'variant' | 'defaultValue'
> & {
  hasAll?: boolean
  placeholder?: string
  categoryId?: number
} & ControlProps<T>

export type InputSearchProps = Omit<TextFieldProps, 'variant' | 'type' | 'onChange'> & {
  onChange?: (e: string) => void
  variant?: 'outlined' | 'contained'
}

export type InputCreditCardProps<T extends FieldValues> = Omit<TextFieldProps, 'variant' | 'id'> &
  ControlProps<T>

export type UploadImageProps<T extends FieldValues> = ControlProps<T> & {
  variant?: 'banner' | 'qr-code'
  size?: string
}
export type UploadLogoProps<T extends FieldValues> = ControlProps<T>
export type UploadLogoShopProps<T extends FieldValues> = ControlProps<T> & {
  hasInstruction?: boolean
}
export type UploadCropVariant = 'logo' | 'avatar'
export interface UploadCropProps<T extends FieldValues> extends UploadLogoShopProps<T> {
  variant: UploadCropVariant
}
export type UploadExcelProps<T extends FieldValues> = ControlProps<T>

export type UploadImageRoboPayProps<T extends FieldValues> = ControlProps<T> & {
  label?: string
}

export type UploadOnlineShopImageProps<T extends FieldValues> = ControlProps<T> & {
  htmlFor: string
  variant?: 'mobile' | 'desktop'
  setValue?: UseFormSetValue<T>
  textSize: string
  hasVideo?: boolean
}
