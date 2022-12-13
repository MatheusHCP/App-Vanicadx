import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../../screens/SignedIn/Home";
import { Profile } from "../../screens/SignedIn/Profile";
import { Icon } from '../../components/Icon';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon icon='fantasma' />
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon icon='morte' />
        }}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator