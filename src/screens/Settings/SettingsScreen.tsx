import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ScreenTemplate } from '../../components/templates/ScreenTemplate';
import { Text } from '../../components/atoms/Text';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

interface SettingsScreenProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  theme,
  toggleTheme,
}) => {
  const colors = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ScreenTemplate title="Settings">
      <View style={styles.container}>
        <View
          style={[
            styles.row,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.primaryText }]}>
            Dark Mode
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={theme === 'dark' ? colors.accent : '#f4f3f4'}
          />
        </View>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
  },
});
