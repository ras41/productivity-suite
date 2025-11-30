import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootTabs } from './src/navigation/RootTabs';
import { StatusBar, useColorScheme } from 'react-native';
import { useThemeStore } from './src/store/themeStore';
import { getSystemTheme } from './src/utils/helpers';

const App = () => {
  const { theme, setTheme, loadTheme, resetTheme } = useThemeStore();
  const systemTheme = useColorScheme();

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const currentTheme = theme || 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootTabs />
    </NavigationContainer>
  );
};

export default App;
