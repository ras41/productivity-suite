import React from 'react';
import {useTheme} from '../../hooks/useTheme';
import {SettingsScreen} from './SettingsScreen';

export const SettingsContainer = () => {
  const {theme, toggleTheme} = useTheme();

  return <SettingsScreen theme={theme} toggleTheme={toggleTheme} />;
};
