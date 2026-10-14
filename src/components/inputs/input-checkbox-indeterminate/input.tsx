import { useRef, useEffect } from 'react'
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import { ReactComponent as IconClearRectangle } from '@/assets/icons/clear-rectangle.svg'

interface HTMLButtonElementProps extends HTMLButtonElement {
  indeterminate: boolean
}

interface InputCheckboxIndeterminateProps extends CheckboxProps {
  isHeader?: boolean
}

export const InputCheckboxIndeterminate = ({
  isHeader,
  indeterminate,
  className = '',
  ...rest
}: InputCheckboxIndeterminateProps) => {
  const ref = useRef<HTMLButtonElementProps>(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      if (ref.current) ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <Checkbox
      ref={ref}
      onChange={a => a}
      icon={isHeader ? <IconClearRectangle /> : undefined}
      {...rest}
    />
  )
}
