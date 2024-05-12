import { PropsWithChildren, createContext, useEffect, useState } from "react";

type Theme = 'dark' | 'light'

interface ThemeContextProps {
    theme: Theme 
    handleChangeTheme: (checked: boolean) => void
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<Theme | any>(localStorage.getItem("THEME_PREFERENCE_USER") as Theme)

    const handleChangeTheme = (checked: boolean) => {
        setTheme(checked ? 'dark' : 'light');
    }

    const themePreferenceUser = (theme: Theme) => {
        localStorage.setItem("THEME_PREFERENCE_USER", theme)
    }

    useEffect(() => {
        const themeStorage = localStorage.getItem("THEME_PREFERENCE_USER");
        if (theme !== themeStorage) {
            themePreferenceUser(theme)
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
