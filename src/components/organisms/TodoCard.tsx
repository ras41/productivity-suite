import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../atoms/Text';
import { Task } from '../../services/api/tasksApi';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

interface TodoCardProps {
  item: Task;
  onToggle: (id: number) => void;
}

export const TodoCard: React.FC<TodoCardProps> = React.memo(
  ({ item, onToggle }) => {
    const { theme } = useTheme();
    const colors = theme === 'light' ? lightTheme : darkTheme;

    const cardColors = [
      colors.primary,
      colors.accent,
      colors.secondary,
      colors.purple,
    ];
    const cardColor = cardColors[item.id % cardColors.length];

    return (
      <TouchableOpacity
        onPress={() => onToggle(item.id)}
        style={styles.container}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderLeftColor: cardColor,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: item.completed
                  ? colors.secondaryText
                  : colors.primaryText,
              },
              item.completed && styles.completedText,
            ]}
          >
            {item.title}
          </Text>
          <View style={[styles.checkbox, { borderColor: cardColor }]}>
            {item.completed && (
              <View
                style={[styles.checkboxInner, { backgroundColor: cardColor }]}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
