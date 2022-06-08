import React from "react";
import { Platform } from "react-native";
import colors from "../config/colors";
import FeedNavigator from "./feedNavigator";
import ChatNavigator from "./ChatNavigator";
import SearchNavigator from "./SearchNavigator";
import DatingNavigator from "./DatingNavigator";
import * as routes from "./routes";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import RIcon from "react-native-remix-icon";
import { useDocumentData } from "react-firebase-hooks/firestore";
import db from "../util/fb_admin";
import { collection, doc } from "firebase/firestore";
import { connect } from "react-redux";
import MarketplaceNavigator from "./MarketplaceNavigator";
import MarketplaceComingSoon from "../screens/MarketplaceComingSoon";

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
      <BottomTabBar
        {...props}
        style={[
          {
            backgroundColor: "transparent",
          },
        ]}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.core.accData.userID,
  };
};

const AppNavigator = ({ user_id }) => {
  const userDocRef = doc(db, "accounts", user_id);
  const [user_snapshot, loading, error] = useDocumentData(userDocRef);

  const padBtm = () => {
    if (Platform.OS === "android") {
      return {
        paddingBottom: 5,
      };
    }
    return {};
  };

  return (
    <Tab.Navigator
      tabBar={TabBar}
      defaultScreenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      screenOptions={{
        lazy: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor:
            Platform.OS === "android" ? colors.dark : colors.transparent,
          borderTopColor: colors.darkish2,
          borderTopWidth: 2,
          paddingTop: 5,
          ...padBtm(),
          // shadowColor: colors.black,
          // shadowOpacity: 20,
          // shadowRadius: 5,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Feed",
          tabBarHideOnKeyboard: true,
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
          tabBarLabel: "Explore",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="search-2-line" color={color} size={size} />
          ),
        }}
        name={routes.SEARCH_NAVIGATOR}
        component={SearchNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Meet",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="group-2-line" color={color} size={size + 3} />
          ),

          tabBarShowLabel: true,
        }}
        name={routes.DATING_NAVIGATOR}
        component={DatingNavigator}
        // component={FeedNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="store-2-line" color={color} size={size} />
          ),
          tabBarShowLabel: true,
        }}
        name="Marketplace"
        // component={MarketplaceComingSoon}
        component={MarketplaceNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="chat-3-line" color={color} size={size} />
          ),
          tabBarShowLabel: true,
          tabBarBadge: user_snapshot?.new_chats_count,
          tabBarBadgeStyle: {
            backgroundColor: colors.dark,
            borderColor: colors.primary,
            borderWidth: 1,
            color: colors.primary,
            padding: 0,
          },
        }}
        name="Chat"
        component={ChatNavigator}
      />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, null)(AppNavigator);
