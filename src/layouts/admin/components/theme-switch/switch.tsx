import { MODES } from './constants'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import { type ChangeEvent } from 'react'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import { useColorScheme } from '@mui/material/styles'
import { Wrap, Round, Wrapper, Container } from './style'
import FormControlLabel from '@mui/material/FormControlLabel'

export const ThemeSwitch = () => {
  const { mode, setMode } = useColorScheme()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.value as 'light' | 'dark'
    setMode(mode)
  }

  return (
    <Container>
      <Wrap
        sx={{
          '.MuiFormControl-root': {
            margin: '0 !important',
          },
        }}
      >
        <FormControl>
          <RadioGroup
            row
            name='mode'
            value={mode}
            defaultValue='light'
            onChange={handleChange}
            aria-labelledby='theme-switch'
          >
            {MODES.map(({ value, label, IconDark, IconLight }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio icon={<div />} checkedIcon={<div />} />}
                label={
                  <Wrapper sx={{ p: value === 'dark' ? '0 12px 0 7px' : '0 7px' }}>
                    <Box display='flex' alignItems='center'>
                      {mode === 'dark' ? <IconDark /> : <IconLight />}
                    </Box>
                    <span className='theme-title'>{label}</span>
                  </Wrapper>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Round
          sx={{
            left: mode === 'light' ? '0' : undefined,
            right: mode === 'dark' ? '0' : undefined,
          }}
        />
      </Wrap>
    </Container>
  )
}
