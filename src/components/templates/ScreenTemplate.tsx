import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { Container } from '../atoms/Container';
import { Header } from '../organisms/Header';

interface ScreenTemplateProps {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
}

export const ScreenTemplate: React.FC<ScreenTemplateProps> = ({
  children,
  style,
  title,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {title && <Header title={title} />}
      <Container style={style}>{children}</Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
