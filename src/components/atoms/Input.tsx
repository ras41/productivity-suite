import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

export const Input: React.FC<TextInputProps> = ({ style, ...props }) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  const inputStyle = [
    styles.input,
    {
      color: colors.primaryText,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    style,
  ];

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={colors.secondaryText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
