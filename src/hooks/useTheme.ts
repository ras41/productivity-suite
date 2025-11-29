import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeStore } from '../store/themeStore';
import { THEME_KEY } from '../utils/constants';

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme) {
        setTheme(storedTheme as 'light' | 'dark');
      }
    };
    loadTheme();
  }, [setTheme]);

  return { theme, toggleTheme };
};
