import { useState } from 'react'
import Stack from '@mui/material/Stack'
import { truncate } from '@/utils/truncate'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import { type MessageProps } from '@/types/chat'
import WavesurferPlayer from '@wavesurfer/react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { PhotoView, PhotoProvider } from 'react-photo-view'
import { Container, WrapFileLink, WrapIconFile } from './style'
import { ReactComponent as IconPlay } from '@/assets/icons/play.svg'
import { ReactComponent as IconFileRound } from '@/assets/icons/file-round.svg'
import { ReactComponent as IconPauseSolid } from '@/assets/icons/pause-solid.svg'
import { LazyLoadImage, type LazyLoadImageProps } from 'react-lazy-load-image-component'

import 'react-photo-view/dist/react-photo-view.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const LazyImage = LazyLoadImage as unknown as (props: LazyLoadImageProps) => JSX.Element

export const Media = (props: MessageProps) => {
  const play = useBoolean()
  const isMineMessage = props.is_bot
  const { value, setFalse } = useBoolean()
  const [wavesurfer, setWavesurfer] = useState(null)
  const [audioDuration, setAudioDuration] = useState<number | null>(null)

  //  @ts-ignore
  const onReady = ws => {
    setWavesurfer(ws)
    play.setFalse()
    setAudioDuration(ws.getDuration())
  }

  const onPlayPause = () => {
    //  @ts-ignore
    wavesurfer?.playPause()
  }

  return (
    <Stack pt='5px' width='100%'>
      {props.is_hidden ? (
        <Stack>
          <Stack
            gap='10px'
            width='100%'
            direction='row'
            minWidth='300px'
            alignItems='center'
            sx={{
              div: {
                width: '100%',
              },
            }}
          >
            <IconButton
              onClick={onPlayPause}
              sx={{
                p: 0,
              }}
            >
              {play.value ? <IconPauseSolid /> : <IconPlay />}
            </IconButton>
            <Stack gap='5px'>
              <WavesurferPlayer
                height={50}
                width='100%'
                onReady={onReady}
                waveColor='white'
                url={props.file.url}
                onPlay={play.setTrue}
                onPause={play.setFalse}
              />
              <Stack gap='10px' direction='row' alignItems='center'>
                {audioDuration !== null && (
                  <Typography
                    align='right'
                    component='h6'
                    variant='text50'
                    color={theme => theme.palette.allColors.WHITE}
                  >
                    {audioDuration.toFixed(2)}
                  </Typography>
                )}
                <Typography
                  align='right'
                  component='h6'
                  variant='text50'
                  color={theme => theme.palette.allColors.WHITE}
                >
                  {props.file.size}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ) : props.file.type === 'image' ? (
        <PhotoProvider>
          <PhotoView src={props.file.url}>
            <Container>
              {value && (
                <div className='loading'>
                  <Skeleton variant='rectangular' width='100%' height='100%' />
                </div>
              )}
              <LazyImage
                width='100%'
                effect='blur'
                height='180px'
                alt={props.text}
                afterLoad={() => {
                  setFalse()
                }}
                src={props.file.url}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  setFalse()
                }}
              />
            </Container>
          </PhotoView>
        </PhotoProvider>
      ) : (
        <WrapFileLink target='_blank' rel='noopener noreferrer' href={props.file.url}>
          <WrapIconFile>
            <IconFileRound />
          </WrapIconFile>
          <Stack gap='2px' display='flex' justifyContent='center'>
            <Typography
              variant='title40'
              color={theme =>
                isMineMessage ? theme.palette.allColors.WHITE : theme.palette.allColors.BLACK
              }
            >
              {truncate({ str: props.file.name, max: 30 })}
            </Typography>
            <Typography
              variant='text'
              color={theme =>
                isMineMessage ? theme.palette.allColors.GRAY130 : theme.palette.allColors.BLACK
              }
            >
              {props.file.size}
            </Typography>
          </Stack>
        </WrapFileLink>
      )}
    </Stack>
  )
}
