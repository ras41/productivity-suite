import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';

type Filter = 'all' | 'active' | 'done';

interface FilterButtonsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="All"
        onPress={() => onFilterChange('all')}
        variant={currentFilter === 'all' ? 'primary' : 'secondary'}
      />
      <Button
        title="Active"
        onPress={() => onFilterChange('active')}
        variant={currentFilter === 'active' ? 'primary' : 'secondary'}
      />
      <Button
        title="Done"
        onPress={() => onFilterChange('done')}
        variant={currentFilter === 'done' ? 'primary' : 'secondary'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
