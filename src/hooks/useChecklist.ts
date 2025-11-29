import { useCallback } from 'react';
import { useChecklistStore } from '../store/checklistStore';

export const useChecklist = () => {
  const { checklists, addChecklist, addItem, toggleItem } = useChecklistStore();

  const handleAddChecklist = useCallback(
    (title: string) => {
      addChecklist(title);
    },
    [addChecklist],
  );

  const handleAddItem = useCallback(
    (checklistId: number, text: string) => {
      addItem(checklistId, text);
    },
    [addItem],
  );

  const handleToggleItem = useCallback(
    (checklistId: number, itemId: number) => {
      toggleItem(checklistId, itemId);
    },
    [toggleItem],
  );

  return {
    checklists,
    addChecklist: handleAddChecklist,
    addItem: handleAddItem,
    toggleItem: handleToggleItem,
  };
};
