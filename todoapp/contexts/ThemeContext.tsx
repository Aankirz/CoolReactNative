import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  useSystemTheme: boolean;
  setUseSystemTheme: (value: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useSystemColorScheme() as Theme;
  const [theme, setTheme] = useState<Theme>('light');
  const [useSystemTheme, setUseSystemTheme] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (useSystemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, useSystemTheme]);

  async function loadThemePreference() {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedUseSystem = await AsyncStorage.getItem('useSystemTheme');
      
      if (savedUseSystem !== null) {
        setUseSystemTheme(JSON.parse(savedUseSystem));
      }
      
      if (savedTheme !== null && !JSON.parse(savedUseSystem)) {
        setTheme(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  }

  const toggleTheme = async () => {
    if (!useSystemTheme) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme);
    }
  };

  const updateUseSystemTheme = async (value: boolean) => {
    setUseSystemTheme(value);
    await AsyncStorage.setItem('useSystemTheme', JSON.stringify(value));
    if (value) {
      setTheme(systemTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: useSystemTheme ? systemTheme : theme,
        useSystemTheme,
        setUseSystemTheme: updateUseSystemTheme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 