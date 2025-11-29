import React from 'react';
import { useFetchTodos } from '../../hooks/useFetchTodos';
import { TasksScreen } from './TasksScreen';
import { useTasksStore } from '../../store/tasksStore';

export const TasksContainer = () => {
  const {
    tasks,
    loading,
    hasMore,
    filter,
    setFilter,
    toggleTask,
    loadMore,
    refresh,
  } = useFetchTodos();
  const { addTask } = useTasksStore();

  return (
    <TasksScreen
      tasks={tasks}
      loading={loading}
      hasMore={hasMore}
      filter={filter}
      setFilter={setFilter}
      toggleTask={toggleTask}
      loadMore={loadMore}
      addTask={addTask}
      refresh={refresh}
    />
  );
};
