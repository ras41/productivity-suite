import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ScreenTemplate } from '../../components/templates/ScreenTemplate';
import { Text } from '../../components/atoms/Text';
import { useTasksStore } from '../../store/tasksStore';
import { useTheme } from '../../hooks/useTheme';
import { lightTheme, darkTheme } from '../../utils/constants';

export const ProfileScreen = () => {
  const tasks = useTasksStore(state => state.tasks);
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const efficiency = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  return (
    <ScreenTemplate title="Profile">
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: colors.surface }]}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={[styles.name, { color: colors.primaryText }]}>
            {user.name}
          </Text>
          <Text style={[styles.email, { color: colors.secondaryText }]}>
            {user.email}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={[styles.stat, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
              Completed Tasks
            </Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {completedTasks}
            </Text>
          </View>
          <View style={[styles.stat, { backgroundColor: colors.surface }]}>
            <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
              Total Tasks
            </Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {totalTasks}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.stat,
            styles.efficiencyStat,
            { backgroundColor: colors.surface, width: '90%' },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.secondaryText }]}>
            Efficiency
          </Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {efficiency.toFixed(1)}%
          </Text>
        </View>
      </View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderColor: '#fff',
    borderWidth: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    width: '48%',
  },
  efficiencyStat: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
