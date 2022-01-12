import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";
import RIcon from "react-native-remix-icon";

//Navigators
import FeedNavigator from "./feedNavigator";
import SearchNavigator from "./SearchNavigator";

// Screens
import PostPage from "../screens/PostPage";
import Profile from "../screens/Profile";
import SetupUniversity from "../screens/SetupUniversity";
import WelcomeScreen from "../screens/WelcomeScreen";
import SetupPersonalInformation from "../screens/SetupPersonalInformation";
import AddPostPage from "../screens/AddPostPage";

import OverlayLoader from "../components/OverlayLoader";
import colors from "../config/colors";
import * as routes from "./routes";

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBar = (props) => {
  return (
    <LinearGradient
      colors={["#1c2b3a", colors.dark]}
      // colors={["red", "white"]}
      start={[1, 0]}
      end={[1, 1]}
    >
      {/* <View style={styles.bottomNav}></View> */}
      <BottomTabBar {...props} style={[{ backgroundColor: "transparent" }]} />
    </LinearGradient>
  );
};

const AppRoutes = ({ core }) => {
  if (core.accData.accountStatus === "pending-setup") {
    // console.log("pending setup");
    return (
      <>
        <OverlayLoader />
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_right",
          }}
          initialRsouteName={
            core.accData.university && core.accData.yearOfStudy
              ? "SetupPersonalInformation"
              : "SetupUniversity"
          }
        >
          {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="WelcomeScreen"
            component={WelcomeScreen}
          /> */}

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={routes.SETUP_UNIVERSITY}
            component={SetupUniversity}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={routes.SETUP_PERSONAL_INFO}
            component={SetupPersonalInformation}
          />
        </Stack.Navigator>
      </>
    );
  }

  return (
    <>
      <OverlayLoader />
      <Stack.Navigator initialRouteName="AppNavigator">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.APP_NAVIGATOR}
          component={AppNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.ADD_POST}
          component={AddPostPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.POST_PAGE}
          component={PostPage}
        />
      </Stack.Navigator>
    </>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{
        tabBarStyle: {
          // marginTop: 0,
          backgroundColor: "transparent",
          borderTopColor: colors.darkish2,
          borderTopWidth: 2,
          // shadowColor: colors.black,
          // shadowOpacity: 20,
          // shadowRadius: 5,
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
        name={routes.FEED_NAVIGATOR}
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
        name={routes.SEARCH_NAVIGATOR}
        component={SearchNavigator}
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
    borderTopColor: colors.dark,
    padding: 5,
    marginTop: -6,
    height: 1,
    width: "100%",
    backgroundColor: colors.dark,
  },
});

export default connect(mapStateToProps, null)(AppRoutes);
