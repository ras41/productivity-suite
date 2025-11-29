import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScreenTemplate } from '../../components/templates/ScreenTemplate';
import { ChecklistGroup } from '../../components/organisms/ChecklistGroup';
import { Fab } from '../../components/organisms/Fab';
import { FormField } from '../../components/molecules/FormField';
import { Button } from '../../components/atoms/Button';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';
import { Text } from '../../components/atoms/Text';

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

interface ChecklistsScreenProps {
  checklists: Checklist[];
  addChecklist: (title: string) => void;
}

export const ChecklistsScreen: React.FC<ChecklistsScreenProps> = ({
  checklists,
  addChecklist,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const renderItem = ({ item }: { item: Checklist }) => (
    <ChecklistGroup checklist={item} />
  );

  const handleAddChecklist = () => {
    if (newChecklistTitle.trim()) {
      addChecklist(newChecklistTitle);
      setNewChecklistTitle('');
      setModalVisible(false);
    }
  };

  return (
    <ScreenTemplate title="Checklists">
      <FlashList
        data={checklists}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
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
              Add New Checklist
            </Text>
            <FormField
              label="Checklist Title"
              value={newChecklistTitle}
              onChangeText={setNewChecklistTitle}
            />
            <View style={{ height: 20 }} />
            <Button title="Add Checklist" onPress={handleAddChecklist} />
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
});
