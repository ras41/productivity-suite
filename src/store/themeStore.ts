import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StateCreator } from 'zustand';
import { THEME_KEY } from '../utils/constants';
import { getSystemTheme } from '../utils/helpers';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  loadTheme: () => Promise<void>;
}

const themeStoreCreator: StateCreator<ThemeState> = set => ({
  theme: (getSystemTheme() as Theme) || 'light',
  loadTheme: async () => {
    try {
      const storedTheme = (await AsyncStorage.getItem(
        THEME_KEY,
      )) as Theme | null;
      if (storedTheme) {
        set({ theme: storedTheme });
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
    }
  },
  toggleTheme: () => {
    set(state => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem(THEME_KEY, newTheme);
      return { theme: newTheme };
    });
  },
  setTheme: theme => {
    AsyncStorage.setItem(THEME_KEY, theme);
    set({ theme });
  },
});

export const useThemeStore = create(themeStoreCreator);
