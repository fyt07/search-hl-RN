import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../modules/Home/HomeScreen';
import GameScreen from '../modules/Game/GameScreen';
//import ProfileScreen from '../modules/Profile/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Главная',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const GameStack = createStackNavigator({
  Game: GameScreen,
});

GameStack.navigationOptions = {
  tabBarLabel: 'Игра',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'logo-game-controller-b'}
    />
  ),
};

// const ProfileStack = createStackNavigator({
//   Profile: ProfileScreen,
// });

// ProfileStack.navigationOptions = {
//   tabBarLabel: 'Профиль',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-person'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  HomeStack,
  GameStack,
  //ProfileStack,
});
