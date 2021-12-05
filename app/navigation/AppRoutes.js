import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import FeedNavigator from "./feedNavigator";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import RIcon from "react-native-remix-icon";

const TabBar = (props) => {
  return (
    <LinearGradient
      colors={["#1c2b3a", colors.dark]}
      // colors={["red", "white"]}
      start={[1, 0]}
      end={[1, 1]}
    >
      <View style={styles.bottomNav}></View>
      <BottomTabBar {...props} style={[{ backgroundColor: "transparent" }]} />
    </LinearGradient>
  );
};
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{
        tabBarStyle: {
          marginTop: 0,
          backgroundColor: "transparent",
          borderTopColor: colors.darkish2,
          borderTopWidth: 2,
          shadowColor: colors.black,
          shadowOpacity: 20,
          shadowRadius: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="home-5-line" color={color} size={size} />
          ),
        }}
        name="Feed"
        component={FeedNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="search-2-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="MEssage"
        component={FeedNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell-o" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Notifications"
        component={FeedNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="store-2-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Store"
        component={FeedNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="chat-3-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Message"
        component={FeedNavigator}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    shadowColor: colors.black,
    shadowOpacity: 25,
    shadowRadius: 5,
    borderTopColor: colors.dark,
    padding: 5,
    marginTop: 0,
    height: 1,
    width: "100%",
    backgroundColor: colors.dark,
  },
});

export default AppNavigator;