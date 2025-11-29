import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../atoms/Input';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search...'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    margin: 10,
  },
});
