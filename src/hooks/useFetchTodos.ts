import { useEffect, useMemo, useCallback } from 'react';
import { useTasksStore } from '../store/tasksStore';

export const useFetchTodos = () => {
  const {
    tasks,
    fetchTasks,
    refreshTasks,
    loading,
    hasMore,
    filter,
    setFilter,
    toggleTask,
    addTask,
  } = useTasksStore();

  useEffect(() => {
    refreshTasks();
  }, [filter]);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'done') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  const handleSetFilter = useCallback(
    (newFilter: 'all' | 'active' | 'done') => {
      setFilter(newFilter);
    },
    [setFilter],
  );

  return {
    tasks: filteredTasks,
    loading,
    hasMore,
    filter,
    setFilter: handleSetFilter,
    toggleTask,
    loadMore: fetchTasks,
    refresh: refreshTasks,
    addTask,
  };
};
