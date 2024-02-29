import { Avatar, ClickAwayListener, ListItemIcon, MenuItem, MenuList } from '@mui/material'
import {
    GetAddressDetailsPath,
    GetBlockDetailsPath,
    GetTransactionDetailsPath,
} from 'utils/route-utils'
import { ISearchMenu, SearchMenuItem } from 'types/search-menu'
import {
    MagellanAddressResponse,
    MagellanAddressSearchResult,
    MagellanCBlockSearchResult,
    MagellanCTransactionSearchResult,
    MagellanSearchResultElementType,
    MagellanXPTransactionSearchResult,
} from 'types/magellan-types'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

import Box from '@mui/material/Box'
import { ChainType } from 'utils/types/chain-type'
import InputAdornment from '@mui/material/InputAdornment'
import Modal from '@mui/material/Modal'
import OutlinedInput from '@mui/material/OutlinedInput'
import { RoutesConfig } from 'utils/route-paths'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import { debounce } from './utils/debounce'
import { getChainID } from 'api/utils'
import { searchApi } from 'utils/magellan-api-utils'
import { selectMagellanAddress } from 'store/app-config'
import { useAppSelector } from 'store/configureStore'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import useWidth from 'app/hooks/useWidth'

function OutlinedSearchInput() {
    const routesConfig = RoutesConfig()
    const theme = useTheme()
    const navigate = useNavigate()
    const magellanAddress = useAppSelector(selectMagellanAddress)
    const [search, setSearch] = useState('')
    const [menuItems, setMenuItems] = useState([] as SearchMenuItem[])
    const [timer, setTimer] = useState(0 as unknown as NodeJS.Timeout)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false)

    const handleSearch = () => {
        setLoading(true)
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            debouncedSearch(search)
        }, 500)
        setTimer(newTimer)
        setLoading(false)
    }

    const mapToItem = (
        type: MagellanSearchResultElementType,
        data:
            | MagellanXPTransactionSearchResult
            | MagellanCTransactionSearchResult
            | MagellanCBlockSearchResult
            | MagellanAddressSearchResult,
    ) => {
        switch (type) {
            case MagellanSearchResultElementType.C_BLOCK:
                const cBlockData: MagellanCBlockSearchResult = data as MagellanCBlockSearchResult
                return {
                    label: cBlockData.hash,
                    type: type,
                    link: GetBlockDetailsPath(ChainType.C_CHAIN, cBlockData.number, routesConfig),
                    avatar: 'CB',
                    avatarColor: 'searchResultItem.bg_CB',
                }
            case MagellanSearchResultElementType.C_ADDRESS:
                const cAddressData: MagellanCBlockSearchResult = data as MagellanCBlockSearchResult
                return {
                    label: cAddressData.hash,
                    type: type,
                    link: GetAddressDetailsPath(ChainType.C_CHAIN, cAddressData.hash, routesConfig),
                    avatar: 'AD',
                    avatarColor: 'searchResultItem.bg_AD',
                }
            case MagellanSearchResultElementType.C_TRANSACTION:
                const cTransaction: MagellanCTransactionSearchResult =
                    data as MagellanCTransactionSearchResult
                return {
                    label: cTransaction.hash,
                    type: type,
                    link: GetTransactionDetailsPath(
                        ChainType.C_CHAIN,
                        cTransaction.hash,
                        routesConfig,
                    ),
                    avatar: 'CT',
                    avatarColor: 'searchResultItem.bg_CT',
                }
            case MagellanSearchResultElementType.XP_TRANSACTION:
                const xpTransaction: MagellanXPTransactionSearchResult =
                    data as MagellanXPTransactionSearchResult
                let detailsLink = ''
                let avatar = ''
                let avatarColor = ''
                const actualChainId = xpTransaction.chainID
                if (actualChainId === getChainID('p')) {
                    detailsLink = GetTransactionDetailsPath(
                        ChainType.P_CHAIN,
                        xpTransaction.id,
                        routesConfig,
                    )
                    avatar = 'PT'
                    avatarColor = 'searchResultItem.bg_PT'
                } else {
                    detailsLink = GetTransactionDetailsPath(
                        ChainType.X_CHAIN,
                        xpTransaction.id,
                        routesConfig,
                    )
                    avatar = 'XT'
                    avatarColor = 'searchResultItem.bg_XT'
                }
                return {
                    label: xpTransaction.id,
                    type: type,
                    link: detailsLink,
                    avatar: avatar,
                    avatarColor: avatarColor,
                }
            case MagellanSearchResultElementType.ADDRESS:
                const xpAddressData: MagellanAddressResponse = data as MagellanAddressResponse
                const ChainId = xpAddressData.chainID
                if (ChainId === getChainID('p')) {
                    return {
                        label: `P-${xpAddressData.address}`,
                        type: type,
                        link: GetAddressDetailsPath(
                            ChainType.P_CHAIN,
                            `P-${xpAddressData.address}`,
                            routesConfig,
                        ),
                        avatar: 'AD',
                        avatarColor: 'searchResultItem.bg_PAD',
                    }
                } else {
                    return {
                        label: `X-${xpAddressData.address}`,
                        type: type,
                        link: GetAddressDetailsPath(
                            ChainType.X_CHAIN,
                            `X-${xpAddressData.address}`,
                            routesConfig,
                        ),
                        avatar: 'AD',
                        avatarColor: 'searchResultItem.bg_XAD',
                    }
                }
            default:
                console.log('Got unknown response type from search', +type)
                return undefined
        }
    }

    const debouncedSearch = debounce(
        async (search: string | string[]) => {
            if (!search || search.length < 1) {
                setMenuItems([])
                return
            }
            setLoading(true)
            const data = await axios
                .get(`${magellanAddress}${searchApi}?query=${search}`)
                .then((res: AxiosResponse) => {
                    return res.data
                })
                .catch((err: AxiosError) => {
                    setLoading(false)
                    return []
                })
            setMenuItems([])
            const numberOfResults = data?.results?.length > 5 ? 5 : data?.results?.length
            for (let i = 0; i < numberOfResults; i++) {
                const mapItem = mapToItem(
                    data.results[i].type,
                    data.results[i].data,
                ) as SearchMenuItem
                if (mapItem) setMenuItems(prev => [...prev, mapItem])
            }
            setLoading(false)
        },
        250,
        search.length === 0,
    )

    const handleClick = () => {
        if (search.length > 0 || loading) setOpen(true)
        else setOpen(prev => !prev)
    }
    const handleClickAway = () => {
        setOpen(false)
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (menuItems.length > 0) {
            navigate(menuItems[0].link)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [search]) // eslint-disable-line

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '40px',
                [theme.breakpoints.down('md')]: {
                    height: '50px !important',
                },
            }}
        >
            <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
            >
                <Box
                    component="form"
                    sx={{
                        height: '40px',
                        [theme.breakpoints.down('md')]: {
                            height: '50px',
                        },
                    }}
                    onSubmit={handleSubmit}
                >
                    <OutlinedInput
                        placeholder="Search by Address / Hash / Block / Token"
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            p: '8px 16px',
                            backgroundColor: 'card.background',
                            boxShadow: 0,
                            backgroundImage: 'none',
                            borderWidth: '1px',
                            borderColor: 'card.border',
                            borderStyle: 'solid',
                            color: 'primary.contrastText',
                            fontSize: '15px',
                            lineHeight: '24px',
                            fontWeight: 500,
                            '.MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            [theme.breakpoints.down('md')]: {
                                height: '50px',
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        onFocus={handleClick}
                        onChange={e => {
                            setSearch(e.target.value)
                        }}
                        onKeyUp={e => {
                            if (e.key === 'Enter' && menuItems.length > 0) {
                                navigate(menuItems[0].link)
                            }
                        }}
                    />
                    <SearchResult
                        open={open}
                        menuItems={menuItems}
                        loading={loading}
                        search={search}
                    />
                </Box>
            </ClickAwayListener>
        </Box>
    )
}

export default function SearchInput() {
    const { isDesktop } = useWidth()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()

    return (
        <>
            {!isDesktop ? (
                <>
                    <SearchIcon onClick={handleOpen} sx={{ color: 'primary.contrastText' }} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        disableEscapeKeyDown
                        disableEnforceFocus
                        disableAutoFocus
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'card.background',
                                boxShadow: 24,
                                width: '500px',
                                maxWidth: '70%',
                                padding: '1rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '40px',
                                borderRadius: '12px',
                                height: '40px',
                                [theme.breakpoints.down('md')]: {
                                    height: 'auto',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    maxWidth: '95%',
                                },
                            }}
                        >
                            <Typography variant="h5" component="h5">
                                Search for anything
                            </Typography>
                            <OutlinedSearchInput />
                        </Box>
                    </Modal>
                </>
            ) : (
                <Box
                    sx={{
                        width: '450px',
                        height: '40px',
                        '@media (max-width:1199px)': {
                            width: '325px',
                        },
                    }}
                >
                    <OutlinedSearchInput />
                </Box>
            )}
        </>
    )
}

const SearchResultMenu = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '300px',
                position: 'absolute',
                zIndex: 999,
                top: '100%',
                overflowX: 'hidden',
                borderRadius: '7px',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                marginTop: '8px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            }}
        >
            {children}
        </Box>
    )
}

const SearchResultMenuList = ({ menuItems }: { menuItems: SearchMenuItem[] }) => {
    console.log(menuItems)
    const navigate = useNavigate()
    return (
        <MenuList>
            {menuItems.map((item: SearchMenuItem) => (
                <MenuItem
                    key={item.label + Math.random().toString(36).substring(2, 15)}
                    onClick={() => {
                        navigate(`${item.link}`)
                    }}
                    sx={{ gap: '10px' }}
                >
                    <ListItemIcon>
                        <Avatar
                            sx={{
                                backgroundColor: item.avatarColor,
                                color: 'primary.contrastText',
                                width: 30,
                                height: 30,
                                borderRadius: '12px',
                            }}
                        >
                            <Typography variant="caption">{item.avatar}</Typography>
                        </Avatar>
                    </ListItemIcon>
                    <Typography variant="body2" component="p" noWrap>
                        {item.label}
                    </Typography>
                </MenuItem>
            ))}
        </MenuList>
    )
}

const SearchResult = ({ open, loading, menuItems, search }: ISearchMenu) => {
    if (open && loading) {
        return (
            <SearchResultMenu>
                <MenuList>
                    <MenuItem key="loading" sx={{ gap: '10px', justifyContent: 'center' }}>
                        <Typography variant="body2" component="p" noWrap>
                            Loading...
                        </Typography>
                    </MenuItem>
                </MenuList>
            </SearchResultMenu>
        )
    } else if (open && !loading) {
        if (menuItems.length > 0) {
            return (
                <SearchResultMenu>
                    <SearchResultMenuList menuItems={menuItems} />
                </SearchResultMenu>
            )
        } else if (
            search.startsWith('0') &&
            search.length !== 36 &&
            search.length !== 42 &&
            menuItems.length === 0
        ) {
            return (
                // this should be updated to be more specific
                <SearchResultMenu>
                    <MenuList>
                        <MenuItem key="no-results" sx={{ gap: '10px', justifyContent: 'center' }}>
                            <Typography variant="body2" component="p" noWrap>
                                No results found
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </SearchResultMenu>
            )
        }
    }
    return null
}
