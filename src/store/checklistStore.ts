import { create, StateCreator } from 'zustand';

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

interface ChecklistState {
  checklists: Checklist[];
  addChecklist: (title: string) => void;
  addItem: (checklistId: number, text: string) => void;
  toggleItem: (checklistId: number, itemId: number) => void;
}

const checklistStoreCreator: StateCreator<ChecklistState> = set => ({
  checklists: [
    {
      id: 1,
      title: 'Grocery List',
      items: [
        { id: 1, text: 'Milk', completed: false },
        { id: 2, text: 'Eggs', completed: true },
        { id: 3, text: 'Bread', completed: false },
      ],
    },
  ],
  addChecklist: title =>
    set(state => ({
      checklists: [
        ...state.checklists,
        { id: Math.random(), title, items: [] },
      ],
    })),
  addItem: (checklistId, text) =>
    set(state => ({
      checklists: state.checklists.map(checklist =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: [
                ...checklist.items,
                { id: Math.random(), text, completed: false },
              ],
            }
          : checklist,
      ),
    })),
  toggleItem: (checklistId, itemId) =>
    set(state => ({
      checklists: state.checklists.map(checklist =>
        checklist.id === checklistId
          ? {
              ...checklist,
              items: checklist.items.map(item =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            }
          : checklist,
      ),
    })),
});

export const useChecklistStore = create(checklistStoreCreator);
