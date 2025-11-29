import { create, StateCreator } from 'zustand';
import { Task, fetchTasks } from '../services/api/tasksApi';

type Filter = 'all' | 'active' | 'done';

interface TasksState {
  tasks: Task[];
  page: number;
  loading: boolean;
  filter: Filter;
  hasMore: boolean;
  fetchTasks: () => Promise<void>;
  refreshTasks: () => Promise<void>;
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  setFilter: (filter: Filter) => void;
}

const tasksStoreCreator: StateCreator<TasksState> = (set, get) => ({
  tasks: [],
  page: 1,
  loading: false,
  filter: 'all',
  hasMore: true,
  fetchTasks: async () => {
    if (get().loading || !get().hasMore) return;
    set({ loading: true });
    const newTasks = await fetchTasks(get().page);
    set(state => ({
      tasks: [...state.tasks, ...newTasks],
      page: state.page + 1,
      loading: false,
      hasMore: newTasks.length > 0,
    }));
  },
  refreshTasks: async () => {
    set({ loading: true, page: 1, tasks: [], hasMore: true });
    const newTasks = await fetchTasks(1);
    set(state => ({
      tasks: newTasks,
      page: 2,
      loading: false,
      hasMore: newTasks.length > 0,
    }));
  },
  addTask: title => {
    set(state => ({
      tasks: [
        {
          id: Math.random(),
          title,
          completed: false,
          userId: 1,
        },
        ...state.tasks,
      ],
    }));
  },
  toggleTask: id => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    }));
  },
  setFilter: filter => {
    set({ filter });
  },
});

export const useTasksStore = create(tasksStoreCreator);
