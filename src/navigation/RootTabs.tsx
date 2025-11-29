import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TasksContainer } from '../screens/Tasks/TasksContainer';
import { ChecklistsContainer } from '../screens/Checklists/ChecklistsContainer';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { SettingsContainer } from '../screens/Settings/SettingsContainer';
import { useTheme } from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../utils/constants';

const Tab = createBottomTabNavigator();

export const RootTabs = () => {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string;

          if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'Checklists') {
            iconName = focused ? 'check-circle' : 'check-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TasksContainer} />
      <Tab.Screen name="Checklists" component={ChecklistsContainer} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsContainer} />
    </Tab.Navigator>
  );
};
