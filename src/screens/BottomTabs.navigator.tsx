import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';
import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        tabBarIcon: ({ size, color }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon size={size} color={color} />;
            case 'History':
              return <HistoryIcon size={size} color={color} />;
            case 'Analytics':
              return <AnalyticsIcon size={size} color={color} />;
            default:
              return null;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleStyle: { fontFamily: theme.fontFamilyBold },
          headerTitle: "Today's Mood",
        }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{
          headerTitleStyle: { fontFamily: theme.fontFamilyBold },
          headerTitle: 'Past moods',
        }}
      />
      <BottomTabs.Screen name="Analytics" component={Analytics} />
    </BottomTabs.Navigator>
  );
};
