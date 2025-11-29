import React, { useState } from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScreenTemplate } from '../../components/templates/ScreenTemplate';
import { TodoCard } from '../../components/organisms/TodoCard';
import { FilterButtons } from '../../components/molecules/FilterButtons';
import { Fab } from '../../components/organisms/Fab';
import { FormField } from '../../components/molecules/FormField';
import { Button } from '../../components/atoms/Button';
import { Task } from '../../services/api/tasksApi';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';
import { Text } from '../../components/atoms/Text';

interface TasksScreenProps {
  tasks: Task[];
  loading: boolean;
  hasMore: boolean;
  filter: 'all' | 'active' | 'done';
  setFilter: (filter: 'all' | 'active' | 'done') => void;
  toggleTask: (id: number) => void;
  loadMore: () => void;
  addTask: (title: string) => void;
  refresh: () => void;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  loading,
  hasMore,
  filter,
  setFilter,
  toggleTask,
  loadMore,
  addTask,
  refresh,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const renderItem = ({ item }: { item: Task }) => (
    <TodoCard item={item} onToggle={toggleTask} />
  );

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle('');
      setModalVisible(false);
    }
  };

  return (
    <ScreenTemplate title="Tasks">
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
      <FlashList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={loading}
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator color={colors.primary} />
          ) : null
        }
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text>No tasks found.</Text>
            </View>
          ) : null
        }
      />
      <Fab onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}
            >
              Add New Task
            </Text>
            <FormField
              label="Task Title"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <View style={{ height: 20 }} />
            <Button title="Add Task" onPress={handleAddTask} />
          </View>
        </View>
      </Modal>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
