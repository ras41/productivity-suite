import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

export const Text: React.FC<TextProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  const textStyle = [styles.text, { color: colors.primaryText }, style];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
