import { Palette, alpha, createTheme } from '@mui/material/styles'

function pxToRem(value: number) {
    return `${value / 16}rem`
}
const grey = {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    A100: '#F5F5F5',
    A200: '#EEEEEE',
    A400: '#DBDBDB',
    A700: '#616161',
}

interface PaletteWithCustomColors extends Palette {
    card: {
        background: string
        border: string
        title: string
        subValue: string
        navBar: string
        contrastText: string
    }
    latestList: {
        iconBackground: string
        iconColor: string
        blockNumber: string
        timestamp: string
        contrastText: string
    }
    link: {
        color: string
        hover: string
        active: string
    }
    radioButton: {
        main: string
    }
    borders: {
        main: string
    }
    titleCard: {
        background: string
        border: string
    }
    searchResultItem: {
        bg_CB: string
        bg_AD: string
        bg_CT: string
        bg_PT: string
        bg_XT: string
        bg_PAD: string
        bg_XAD: string
    }
}

export const LightThemePalette: Partial<PaletteWithCustomColors> = {
    mode: 'light',
    primary: {
        main: '#F5F6FA',
        dark: '#F8FAFC',
        light: '#E2E8F0',
        contrastText: '#0F172A',
    },
    secondary: {
        main: '#0085FF',
        light: '#B440FC',
        dark: '#7E2DB0',
        contrastText: '#0F172A',
    },
    error: {
        light: '#C23F38',
        dark: '#B63831',
        main: '#DD5E56',
        contrastText: '#0F172A',
    },
    warning: {
        light: '#F19D38',
        dark: '#D55C26',
        main: '#DD742D',
        contrastText: '#0F172A',
    },
    info: {
        light: '#4BA6EE',
        main: '#3B86CB',
        dark: '#235696',
        contrastText: '#0F172A',
    },
    success: {
        light: '#457B3B',
        main: '#35E9AD',
        dark: '#2F5D28',
        contrastText: '#0F172A',
    },
    grey: grey,
    card: {
        background: '#FFFFFF',
        navBar: '#FFFFFF',
        border: '#CBD4E2',
        title: '#0F172A',
        subValue: '#334155',
        contrastText: '#0F172A',
    },
    latestList: {
        iconBackground: '#E2E8F0',
        iconColor: '#2E3134',
        blockNumber: '#149EED',
        timestamp: '#334155',
        contrastText: '#0F172A',
    },
    radioButton: {
        main: '#149EED',
    },
    borders: {
        main: '#CBD5E1',
    },
    titleCard: {
        background: '#F8FAFC',
        border: '#CBD5E1',
    },
    searchResultItem: {
        bg_CB: '#149EED',
        bg_AD: '#21BA45',
        bg_CT: '#31CCEC',
        bg_PT: '#35E9AD',
        bg_XT: '#B440FC',
        bg_PAD: '#F19D38',
        bg_XAD: '#31CCEC',
    },
}

export const DarkThemePalette: Partial<PaletteWithCustomColors> = {
    mode: 'dark',
    primary: {
        main: '#0F172A',
        dark: '#0F172A',
        light: '#1E293B',
        contrastText: '#FFFFFF',
    },
    secondary: {
        main: '#0085FF',
        light: '#B440FC',
        dark: '#7E2DB0',
        contrastText: '#0F172A',
    },
    error: {
        light: '#DD5E56',
        dark: '#B63831',
        main: '#C23F38',
        contrastText: '#FFFFFF',
    },
    warning: {
        light: '#F19D38',
        dark: '#D55C26',
        main: '#DD742D',
        contrastText: '#FFFFFF',
    },
    info: {
        light: '#4BA6EE',
        main: '#3B86CB',
        dark: '#235696',
        contrastText: '#FFFFFF',
    },
    success: {
        light: '#35E9AD',
        main: '#35E9AD',
        dark: '#2F5D28',
        contrastText: '#FFFFFF',
    },
    grey: grey,
    card: {
        background: `var(--bg)`,
        navBar: `var(--bg)`,
        border: '#334155',
        title: '#64748B',
        subValue: '#64748B',
        contrastText: '#FFFFFF',
    },
    latestList: {
        iconBackground: '#1E293B',
        iconColor: '#FFFFFF',
        blockNumber: '#149EED',
        timestamp: '#64748B',
        contrastText: '#0F172A',
    },
    radioButton: {
        main: '#FFFFFF',
    },
    borders: {
        main: '#1E293B',
    },
    titleCard: {
        background: '#1E293B',
        border: '#64748B',
    },
    searchResultItem: {
        bg_CB: '#149EED',
        bg_AD: '#21BA45',
        bg_CT: '#31CCEC',
        bg_PT: '#35E9AD',
        bg_XT: '#B440FC',
        bg_PAD: '#F19D38',
        bg_XAD: '#31CCEC',
    },
}

const FONT = '"Inter", sans-serif'

const defaultTheme = {
    typography: {
        fontSize: 16,
        fontFamily: FONT,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
        fontFeatureSettings: '"ss01" on',
        h1: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(64),
            lineHeight: '83px',
            letterSpacing: '-2.2%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        h2: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(48),
            lineHeight: '62px',
            letterSpacing: '-2.2%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        h3: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(40),
            lineHeight: '52px',
            letterSpacing: '-1.1%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        h4: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(34),
            lineHeight: '42px',
            letterSpacing: '-1.1%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        h5: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(20),
            lineHeight: '36px',
            letterSpacing: '-1.1%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        h6: {
            fontFamily: FONT,
            fontStyle: 'normal',
            fontSize: pxToRem(18),
            lineHeight: '26px',
            letterSpacing: '-1.1%',
            fontWeight: '700',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        subtitle1: {
            fontFamily: FONT,
            fontWeight: 500,
            lineHeight: '36px',
            letterSpacing: '-2.2%',
            fontSize: pxToRem(20),
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        subtitle2: {
            fontFamily: FONT,
            fontWeight: 500,
            lineHeight: '30px',
            letterSpacing: '-1.1%',
            fontSize: pxToRem(18),
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        body1: {
            fontFamily: FONT,
            lineHeight: '28px',
            letterSpacing: '-1.1%',
            fontWeight: 500,
            fontSize: pxToRem(16),
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        body2: {
            fontFamily: FONT,
            lineHeight: '24px',
            fontWeight: 500,
            fontSize: pxToRem(14),
            letterSpacing: '-1.1%',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
        caption: {
            fontFamily: FONT,
            lineHeight: '20px',
            fontWeight: 500,
            fontSize: pxToRem(12),
            letterSpacing: '-1.1%',
            fontVariantNumeric: 'lining-nums tabular-nums slashed-zero',
            fontFeatureSettings: '"ss01" on',
        },
    },
}
const defaultComponents = {
    MuiSelect: {
        styleOverrides: {
            select: {
                padding: '0.5rem 0rem',
                fontSize: '1rem',
                lineheight: '1.5rem',
            },
        },
    },
    // MuiPaper: {
    //     styleOverrides: {
    //         root: {
    //             // boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    //             boxShadow: 'none',
    //             borderRadius: '7px',
    //             borderColor: 'card.border',
    //         },
    //     },
    // },
    MuiTab: {
        styleOverrides: {
            root: {
                padding: '0rem',
                textTransform: 'capitalize' as const,
            },
            indicator: {
                backgroundColor: 'transparent',
            },
        },
    },
    MuiContainer: {
        styleOverrides: {
            root: {
                position: 'relative' as const,
                display: 'flex',
                flexDirection: 'column' as const,
                margin: 'auto',
                flex: 1,
                // marginTop: '140px',
                gap: '20px',
                marginBottom: '30px',
                '@media (max-width: 899px)': {
                    // marginTop: "100px",
                },
            },
        },
    },
    MuiSvgIcon: {
        styleOverrides: {
            root: {
                '@media (max-width: 400px)': {
                    width: '0.75em',
                    height: '0.75em',
                },
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderWidth: '1.5px',
                '&:hover': {
                    borderWidth: '1.5px',
                },
            },
        },
    },
}

export const lightTheme = createTheme({
    palette: LightThemePalette,
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '7px',
                    borderColor: '#CBD4E2',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#E2E8F0',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '7px',
                },
                notchedOutline: {
                    borderColor: '#CBD5E1 !important',
                    borderWidth: '1px !important',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'linear-gradient(#E2E8F0, #E2E8F0)',
                    borderRadius: '0px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E2E8F0',
                    fontSize: '0.6875rem',
                },
            },
        },
        ...defaultComponents,
    },
    ...defaultTheme,
})

export const darkTheme = createTheme({
    palette: DarkThemePalette,
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '7px',
                    borderColor: '#334155',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: `var(--bg)`,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '7px',
                },
                notchedOutline: {
                    borderColor: '#1E293B !important',
                    borderWidth: '1px !important',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'linear-gradient(#0F172A, #0F172A)',
                    borderRadius: '0px',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1E293B',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #1E293B',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1E293B',
                    fontSize: '0.6875rem',
                },
            },
        },
        ...defaultComponents,
    },
    ...defaultTheme,
})
