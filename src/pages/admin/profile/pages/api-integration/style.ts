import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'

export const TokenCard = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '10px',
  padding: '20px',
}))

export const TokenBox = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  overflow: 'hidden',
}))

export const TokenValue = styled('input')(({ theme }) => ({
  flex: 1,
  padding: '10px 14px',
  // eslint-disable-next-line prettier/prettier, quotes
  fontFamily: "'Courier New', monospace",
  fontSize: '12.5px',
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'text',
}))

export const TokenAction = styled('button')<{ danger?: boolean }>(({ theme, danger }) => ({
  height: '40px',
  padding: '0 14px',
  background: 'transparent',
  border: 'none',
  borderLeft: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  color: danger ? theme.palette.error.main : theme.palette.primary.main,
  transition: 'background 0.15s',
  '&:hover': {
    background: danger ? 'rgba(226, 75, 74, 0.08)' : 'rgba(13, 158, 114, 0.08)',
  },
}))

export const WarningBox = styled(Stack)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(255, 251, 230, 0.08)' : '#fffbe6',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(245, 216, 106, 0.3)' : '#f5d86a'}`,
  borderRadius: '8px',
  padding: '11px 14px',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'flex-start',
  fontSize: '12px',
  color: theme.palette.mode === 'dark' ? '#f5d86a' : '#8a6d00',
}))

export const HowBox = styled(Stack)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(13, 158, 114, 0.06)' : '#f4faf7',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(13, 158, 114, 0.2)' : '#d4eddf'}`,
  borderRadius: '10px',
  padding: '18px 20px',
}))

export const HowStepNum = styled('div')(({ theme }) => ({
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  background: theme.palette.primary.main,
  color: '#fff',
  fontSize: '12px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const CodeBlock = styled('pre')(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : '#1a1a2e',
  color: '#e0e0e0',
  borderRadius: '8px',
  padding: '14px 16px',
  fontSize: '12.5px',
  // eslint-disable-next-line prettier/prettier, quotes
  fontFamily: "'Courier New', monospace",
  overflowX: 'auto',
  lineHeight: 1.7,
  margin: 0,
}))

export const CodeInline = styled('code')(({ theme }) => ({
  background:
    theme.palette.mode === 'dark' ? 'rgba(13, 158, 114, 0.15)' : 'rgba(13, 158, 114, 0.1)',
  color: theme.palette.primary.main,
  padding: '1px 6px',
  borderRadius: '4px',
  fontSize: '12.5px',
  // eslint-disable-next-line prettier/prettier, quotes
  fontFamily: "'Courier New', monospace",
}))
