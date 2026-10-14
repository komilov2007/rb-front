import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { type HocProps } from '@/types/hoc'
import Typography from '@mui/material/Typography'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary as ClassBoundary } from 'react-error-boundary'

const ErrorBoundary = ({ children }: HocProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ClassBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Stack p='50px' height='100%' alignItems='center' justifyContent='center'>
              <Typography>Oops! Something went Awry</Typography>
              <Typography align='center'>
                We’re sorry, but seems there’s been a hiccup on our end. Our team has been notified
                and is working diligently to resolve this issue.
              </Typography>
              <Button fullWidth sx={{ maxWidth: '146px' }} onClick={resetErrorBoundary}>
                Try again
              </Button>
            </Stack>
          )}
        >
          {children}
        </ClassBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default ErrorBoundary
