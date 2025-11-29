import { Appearance, ColorSchemeName } from 'react-native';

export const getSystemTheme = (systemTheme?: ColorSchemeName | null) => {
  const theme = systemTheme || Appearance.getColorScheme();
  return theme || 'light';
};
