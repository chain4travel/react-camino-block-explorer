import React, { useEffect, useState, useMemo, useContext } from 'react'
import { PaletteMode } from '@mui/material'

import { lightTheme, darkTheme } from './themes'
import { ThemeOptions, useTheme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    ...(mode === 'light' ? lightTheme : darkTheme),
})

export const ColorModeContext = React.createContext<{
    toggleColorMode: (v?: PaletteMode) => void
}>({
    toggleColorMode: function (v?: PaletteMode | undefined): void {
        throw new Error('Function not implemented.')
    },
})

export const ThemeProvider = (props: { children: React.ReactChild }) => {
    const [mode, setMode] = useState<PaletteMode>('dark') // light or dark default mode is light

    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: (s: PaletteMode) => {
                setMode(() => {
                    return s
                })
            },
        }),
        [],
    )

    useEffect(() => {
        localStorage.setItem('colorMode', JSON.stringify(mode))
    }, [mode])
    // useEffect(()=>{},)

    // Update the theme only if the mode changes
    const theme = useMemo(() => {
        return createTheme(getDesignTokens(mode))
    }, [mode])
    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>{React.Children.only(props.children)}</MuiThemeProvider>
        </ColorModeContext.Provider>
    )
}

export const useTh = () => {
    return {
        themeContext: useContext(ColorModeContext),
        theme: useTheme(),
    }
}
