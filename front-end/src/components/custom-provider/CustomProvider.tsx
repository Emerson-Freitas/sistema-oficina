import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { CustomProvider as RSuiteCustomProvideer } from 'rsuite'

const CustomProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme()
    return (
        <RSuiteCustomProvideer theme={theme === "dark" ? "dark" : "light"}>
            {children}
        </RSuiteCustomProvideer>
    )
}

export default CustomProvider