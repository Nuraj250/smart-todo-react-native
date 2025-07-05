import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const colorScheme: ColorSchemeName = Appearance.getColorScheme();
        if (colorScheme === 'dark') setTheme('dark');
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
