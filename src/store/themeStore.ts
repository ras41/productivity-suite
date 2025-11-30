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
  resetTheme: () => Promise<void>;
}

const themeStoreCreator: StateCreator<ThemeState> = set => ({
  theme: 'dark',
  loadTheme: async () => {
    try {
      const storedTheme = (await AsyncStorage.getItem(
        THEME_KEY,
      )) as Theme | null;
      if (storedTheme) {
        set({ theme: storedTheme });
      } else {
        // First time opening the app - set dark theme as default
        const defaultTheme = 'dark';
        await AsyncStorage.setItem(THEME_KEY, defaultTheme);
        set({ theme: defaultTheme });
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
    }
  },
  toggleTheme: () => {
    set(state => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'; //theme
      AsyncStorage.setItem(THEME_KEY, newTheme);
      return { theme: newTheme };
    });
  },
  setTheme: theme => {
    AsyncStorage.setItem(THEME_KEY, theme);
    set({ theme });
  },
  resetTheme: async () => {
    try {
      await AsyncStorage.removeItem(THEME_KEY);
      set({ theme: 'dark' });
    } catch (error) {
      console.error('Error resetting theme:', error);
    }
  },
});

export const useThemeStore = create(themeStoreCreator);
