import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../../screens/SignedIn/Home";
import { Profile } from "../../screens/SignedIn/Profile";
import { Icon } from '../../components/Icon';
import { useTheme } from 'styled-components/native';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {

  const {colors} = useTheme();

  return (
    <BottomTab.Navigator screenOptions={{
       tabBarActiveTintColor: colors.primary.main,
       tabBarInactiveTintColor: colors.surface100.main
    }}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon icon='home' activeColor={color} />
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon icon='profile' activeColor={color}/>,
        }}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator