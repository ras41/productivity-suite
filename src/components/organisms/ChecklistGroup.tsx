import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from '../atoms/Text';
import { FlashList } from '@shopify/flash-list';
import { useChecklist } from '../../hooks/useChecklist';
import { Button } from '../atoms/Button';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface Checklist {
  id: number;
  title: string;
  items: ChecklistItem[];
}

interface ChecklistGroupProps {
  checklist: Checklist;
}

const ChecklistItemRow: React.FC<{
  item: ChecklistItem;
  onToggle: () => void;
}> = React.memo(({ item, onToggle }) => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  return (
    <View style={[styles.itemContainer, { borderBottomColor: colors.border }]}>
      <Text
        style={[
          styles.text,
          { color: item.completed ? colors.secondaryText : colors.primaryText },
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>
      <Button
        title={item.completed ? 'Undo' : 'Done'}
        onPress={onToggle}
        variant="secondary"
      />
    </View>
  );
});

export const ChecklistGroup: React.FC<ChecklistGroupProps> = ({
  checklist,
}) => {
  const { toggleItem, addItem } = useChecklist();
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      addItem(checklist.id, newItemText);
      setNewItemText('');
    }
  };

  const renderItem = ({ item }: { item: ChecklistItem }) => (
    <ChecklistItemRow
      item={item}
      onToggle={() => toggleItem(checklist.id, item.id)}
    />
  );

  const completedCount = checklist.items.filter(item => item.completed).length;
  const progress =
    checklist.items.length > 0
      ? (completedCount / checklist.items.length) * 100
      : 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.title, { color: colors.primaryText }]}>
        {checklist.title}
      </Text>
      <View
        style={[
          styles.progressBarContainer,
          { backgroundColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%`, backgroundColor: colors.primary },
          ]}
        />
      </View>
      <FlashList
        data={checklist.items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.addItemContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.primaryText,
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
          ]}
          placeholder="Add new item..."
          placeholderTextColor={colors.secondaryText}
          value={newItemText}
          onChangeText={setNewItemText}
        />
        <Button title="Add" onPress={handleAddItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
  },
  addItemContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
