import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';
import { Text } from './Text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: variant === 'primary' ? colors.primary : colors.surface,
      borderColor: colors.primary,
      borderWidth: variant === 'secondary' ? 1 : 0,
    },
    style,
  ];
  const textStyles = [
    styles.text,
    {
      color: variant === 'primary' ? '#FFFFFF' : colors.primary,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
