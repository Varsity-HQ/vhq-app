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

const mapStateToProps = (state) => {
  return {
    user_id: state.core.accData.userID,
  };
};

const AppNavigator = ({ user_id }) => {
  const userDocRef = doc(db, "accounts", user_id);
  const [user_snapshot, loading, error] = useDocumentData(userDocRef);

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
          // marginTop: 0,
          backgroundColor: "transparent",
          borderTopColor: colors.darkish2,
          borderTopWidth: 2,
          paddingBottom: 3,
          paddingTop: 2,

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
          tabBarLabel: "Dating",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="hearts-line" color={color} size={size + 3} />
          ),

          tabBarShowLabel: true,
        }}
        name={routes.DATING_NAVIGATOR}
        component={DatingNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="store-2-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Marketplace"
        component={FeedNavigator}
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