import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import ImageBanner from '@/assets/images/banner.webp'
import { useState, type SyntheticEvent } from 'react'
import { ReactComponent as IconGlobe } from '@/assets/icons/globe.svg'
import { ReactComponent as IconIphone } from '@/assets/icons/iphone.svg'
import { ReactComponent as IconSearch } from '@/assets/icons/search.svg'
import { TABS, type PreviewProps, type DeviceTypeProps } from './constants'
import { ReactComponent as IconMacBody } from '@/assets/icons/mac-body.svg'
import { ReactComponent as IconMacCamera } from '@/assets/icons/mac-camera.svg'
import { ReactComponent as IconTelegram } from '@/assets/icons/telegram-send.svg'
import { ReactComponent as IconMacDisplay } from '@/assets/icons/mac-display.svg'
import { ReactComponent as IconUserAccount } from '@/assets/icons/user-account.svg'
import { ReactComponent as IconIphoneHeader } from '@/assets/icons/iphone-header.svg'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import {
  Header,
  Banners,
  WrapMac,
  WrapMore,
  Products,
  Container,
  WrapPrice,
  WrapMobile,
  Categories,
  WrapSearch,
  MacContent,
  WrapProduct,
  WrapMacBody,
  WrapCategory,
  WrapUsername,
  WrapMacContent,
  WrapFrontCamera,
  WrapMobileContent,
} from './style'

export const Preview = ({ url, username, product, category }: PreviewProps) => {
  const { t } = useTranslation()
  const { setTrue } = useBoolean()
  const [device, setDevice] = useState<DeviceTypeProps>(TABS[0].value)
  const { platforms, is_new_version, shopId } = useProfileStore(state => ({
    platforms: state.me?.platforms ?? [],
    is_new_version: state.me?.is_new_version,
    shopId: state.me?.id,
  }))

  const onChangeTab = (_: SyntheticEvent, device: DeviceTypeProps) => {
    setDevice(device)
  }

  return (
    <Container>
      <TabContext value={device}>
        {platforms.includes('WEBSITE') && (
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={onChangeTab}
            aria-label='preview-tabs'
          >
            {TABS.map(({ Icon, ...tab }, i: number) => (
              <Tab
                key={i}
                icon={<Icon />}
                value={tab.value}
                label={t(tab.label)}
                iconPosition='start'
              />
            ))}
          </TabList>
        )}
        <TabPanel value='mobile'>
          <Stack alignItems='center'>
            <WrapMobile onClick={setTrue}>
              <IconIphone />
              <WrapFrontCamera>
                <IconIphoneHeader />
              </WrapFrontCamera>
              <WrapMobileContent>
                {is_new_version ? (
                  <iframe
                    src={`https://shop.robosell.uz/?shop_id=${shopId}`}
                    width={450}
                    height={920}
                    style={{
                      transform: 'scale(0.4)',
                      transformOrigin: 'top left',
                      border: 'none',
                    }}
                  ></iframe>
                ) : (
                  <>
                    <Header>
                      <Stack
                        pl='6px'
                        sx={{
                          svg: {
                            width: '15.5px',
                            height: '15.5px',
                          },
                        }}
                      >
                        <IconUserAccount />
                      </Stack>
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='text120' fontSize='6px'>
                          Выберите адрес доставки
                        </Typography>
                        <Stack
                          justifyContent='center'
                          sx={theme => ({
                            svg: {
                              width: '10px',
                              height: '10px',
                              path: {
                                stroke: theme.palette.allColors.BLACK,
                              },
                            },
                          })}
                        >
                          <IconDirectionDown />
                        </Stack>
                      </Stack>
                      <div />
                    </Header>
                    <Banners>
                      <img src={ImageBanner} />
                    </Banners>
                    <WrapSearch>
                      <IconSearch />
                      <Typography variant='text130' fontSize='6px'>
                        Search product
                      </Typography>
                    </WrapSearch>
                    <Stack>
                      <Categories>
                        <WrapCategory>
                          <img src={category?.photo} alt={category?.name} />
                          <Typography variant='title30' fontSize='5px' noWrap>
                            {category?.name}
                          </Typography>
                        </WrapCategory>
                        {Array.from({ length: 6 }, (_, i: number) => (
                          <WrapCategory key={i}>
                            <Skeleton
                              width='100%'
                              height='29px'
                              animation={false}
                              variant='rounded'
                              sx={theme => ({
                                borderRadius: '7.4px',
                                backgroundColor: theme.palette.allColors.GRAY420,
                              })}
                            />
                            <Skeleton
                              height='5px'
                              width='21px'
                              animation={false}
                              variant='rounded'
                              sx={theme => ({
                                borderRadius: '1.6px',
                                backgroundColor: theme.palette.allColors.GRAY420,
                              })}
                            />
                          </WrapCategory>
                        ))}
                      </Categories>
                      <Stack>
                        <Stack
                          px='7px'
                          mb='5px'
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Typography variant='title70' fontSize='6.5px'>
                            {category?.name}
                          </Typography>
                          <WrapMore>
                            +75 ещё
                            <Stack justifyContent='center'>
                              <IconDirectionDown />
                            </Stack>
                          </WrapMore>
                        </Stack>
                        <Products>
                          <WrapProduct>
                            <img src={product?.image} alt={product?.name} />
                            <Stack flexGrow={1} justifyContent='space-between'>
                              <Typography mt='2.4px' variant='title20' fontSize='5.318px'>
                                {product?.name}
                              </Typography>
                              <WrapPrice>{product?.price}</WrapPrice>
                            </Stack>
                          </WrapProduct>
                          {Array.from({ length: 6 }, (_, i: number) => (
                            <WrapProduct key={i}>
                              <Skeleton
                                width='100%'
                                height='35px'
                                variant='rounded'
                                animation={false}
                                sx={theme => ({
                                  borderRadius: '4.091px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Stack mt='2.4px' flexGrow={1} justifyContent='space-between'>
                                <Skeleton
                                  height='13px'
                                  width='100%'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                                <Skeleton
                                  width='80%'
                                  height='6px'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                                <Skeleton
                                  height='13px'
                                  width='100%'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                              </Stack>
                            </WrapProduct>
                          ))}
                        </Products>
                      </Stack>
                      <Stack>
                        <Stack
                          px='7px'
                          mb='5px'
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Typography variant='title70' fontSize='6.5px'>
                            {category?.name}
                          </Typography>
                          <WrapMore>
                            +75 ещё
                            <Stack justifyContent='center'>
                              <IconDirectionDown />
                            </Stack>
                          </WrapMore>
                        </Stack>
                        <Products>
                          {Array.from({ length: 6 }, (_, i: number) => (
                            <WrapProduct key={i}>
                              <Skeleton
                                width='100%'
                                height='35px'
                                variant='rounded'
                                animation={false}
                                sx={theme => ({
                                  borderRadius: '4.091px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Stack mt='2.4px' flexGrow={1} justifyContent='space-between'>
                                <Skeleton
                                  height='13px'
                                  width='100%'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                                <Skeleton
                                  width='80%'
                                  height='6px'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                                <Skeleton
                                  height='13px'
                                  width='100%'
                                  animation={false}
                                  variant='rounded'
                                  sx={theme => ({
                                    borderRadius: '2.4px',
                                    backgroundColor: theme.palette.allColors.GRAY510,
                                  })}
                                />
                              </Stack>
                            </WrapProduct>
                          ))}
                        </Products>
                      </Stack>
                    </Stack>
                  </>
                )}
              </WrapMobileContent>
            </WrapMobile>
            <Stack gap='15px' direction='row' alignItems='center' justifyContent='center'>
              {username && (
                <WrapUsername>
                  <Typography>{username}</Typography>
                </WrapUsername>
              )}
            </Stack>
          </Stack>
        </TabPanel>
        <TabPanel value='desktop'>
          <WrapMac>
            <Stack sx={{ top: '18px', left: 0, zIndex: 3, position: 'relative' }}>
              <IconMacCamera />
            </Stack>
            <WrapMacContent>
              <IconMacDisplay />
              <MacContent>
                {is_new_version ? (
                  <iframe
                    src={`https://shop.robosell.uz/?shop_id=${shopId}`}
                    width='1280'
                    height='850'
                    style={{
                      transform: 'scale(0.3)',
                      transformOrigin: 'top left',
                      border: 'none',
                    }}
                  ></iframe>
                ) : (
                  <Stack>
                    <Categories>
                      <WrapCategory>
                        <img src={category?.photo} alt={category?.name} />
                        <Typography variant='title30' fontSize='5px' noWrap>
                          {category?.name}
                        </Typography>
                      </WrapCategory>
                      {Array.from({ length: 6 }, (_, i: number) => (
                        <WrapCategory key={i}>
                          <Skeleton
                            width='100%'
                            height='29px'
                            animation={false}
                            variant='rounded'
                            sx={theme => ({
                              borderRadius: '7.4px',
                              backgroundColor: theme.palette.allColors.GRAY420,
                            })}
                          />
                          <Skeleton
                            height='5px'
                            width='21px'
                            animation={false}
                            variant='rounded'
                            sx={theme => ({
                              borderRadius: '1.6px',
                              backgroundColor: theme.palette.allColors.GRAY420,
                            })}
                          />
                        </WrapCategory>
                      ))}
                    </Categories>
                    <Stack>
                      <Stack
                        px='7px'
                        mb='5px'
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Typography variant='title70' fontSize='6.5px'>
                          {category?.name}
                        </Typography>
                        <WrapMore>
                          +75 ещё
                          <Stack justifyContent='center'>
                            <IconDirectionDown />
                          </Stack>
                        </WrapMore>
                      </Stack>
                      <Products>
                        <WrapProduct>
                          <img src={product?.image} alt={product?.name} />
                          <Stack flexGrow={1} justifyContent='space-between'>
                            <Typography mt='2.4px' variant='title20' fontSize='5.318px'>
                              {product?.name}
                            </Typography>
                            <WrapPrice>{product?.price}</WrapPrice>
                          </Stack>
                        </WrapProduct>
                        {Array.from({ length: 6 }, (_, i: number) => (
                          <WrapProduct key={i}>
                            <Skeleton
                              width='100%'
                              height='35px'
                              variant='rounded'
                              animation={false}
                              sx={theme => ({
                                borderRadius: '4.091px',
                                backgroundColor: theme.palette.allColors.GRAY510,
                              })}
                            />
                            <Stack mt='2.4px' flexGrow={1} justifyContent='space-between'>
                              <Skeleton
                                height='13px'
                                width='100%'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Skeleton
                                width='80%'
                                height='6px'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Skeleton
                                height='13px'
                                width='100%'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                            </Stack>
                          </WrapProduct>
                        ))}
                      </Products>
                    </Stack>
                    <Stack>
                      <Stack
                        px='7px'
                        mb='5px'
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Typography variant='title70' fontSize='6.5px'>
                          {category?.name}
                        </Typography>
                        <WrapMore>
                          +75 ещё
                          <Stack justifyContent='center'>
                            <IconDirectionDown />
                          </Stack>
                        </WrapMore>
                      </Stack>
                      <Products>
                        {Array.from({ length: 6 }, (_, i: number) => (
                          <WrapProduct key={i}>
                            <Skeleton
                              width='100%'
                              height='35px'
                              variant='rounded'
                              animation={false}
                              sx={theme => ({
                                borderRadius: '4.091px',
                                backgroundColor: theme.palette.allColors.GRAY510,
                              })}
                            />
                            <Stack mt='2.4px' flexGrow={1} justifyContent='space-between'>
                              <Skeleton
                                height='13px'
                                width='100%'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Skeleton
                                width='80%'
                                height='6px'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                              <Skeleton
                                height='13px'
                                width='100%'
                                animation={false}
                                variant='rounded'
                                sx={theme => ({
                                  borderRadius: '2.4px',
                                  backgroundColor: theme.palette.allColors.GRAY510,
                                })}
                              />
                            </Stack>
                          </WrapProduct>
                        ))}
                      </Products>
                    </Stack>
                  </Stack>
                )}
              </MacContent>
            </WrapMacContent>
            <WrapMacBody>
              <IconMacBody />
            </WrapMacBody>
          </WrapMac>
        </TabPanel>
        {url && (
          <Button
            to={url}
            fullWidth
            size='small'
            target='_blank'
            component={Link}
            variant='telegram'
            startIcon={
              platforms.includes('WEBSITE') ? (
                <Stack
                  sx={theme => ({
                    svg: {
                      path: {
                        fill: 'none',
                        stroke: theme.palette.allColors.WHITE,
                      },
                    },
                  })}
                >
                  <IconGlobe />
                </Stack>
              ) : (
                <IconTelegram />
              )
            }
            sx={theme => ({
              maxWidth: '180px',
              borderRadius: '6px',
              svg: {
                path: {
                  fill: theme.palette.allColors.WHITE,
                },
              },
            })}
          >
            {t(platforms.includes('WEBSITE') ? 'open_in_website' : 'open_in_telegram')}
          </Button>
        )}
      </TabContext>
    </Container>
  )
}
