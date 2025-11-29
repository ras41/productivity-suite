import React from 'react';
import {useChecklist} from '../../hooks/useChecklist';
import {ChecklistsScreen} from './ChecklistsScreen';

export const ChecklistsContainer = () => {
  const {checklists, addChecklist, addItem, toggleItem} = useChecklist();

  return (
    <ChecklistsScreen
      checklists={checklists}
      addChecklist={addChecklist}
      addItem={addItem}
      toggleItem={toggleItem}
    />
  );
};
