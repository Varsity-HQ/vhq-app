import React from "react";
import { Platform } from "react-native";
import colors from "../config/colors";
import FeedNavigator from "./feedNavigator";
import ChatNavigator from "./ChatNavigator";
import AskViNavigator from "./AskViNavigator";
import DatingNavigator from "./DatingNavigator";
import * as routes from "./routes";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import RIcon from "react-native-remix-icon";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import db from "../util/fb_admin";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { connect } from "react-redux";
import MarketplaceNavigator from "./MarketplaceNavigator";
import MarketplaceComingSoon from "../screens/MarketplaceComingSoon";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { __get_chatAcc_id } from "../util/chatRoomUtils";

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
    discover_profile_id: state.core.accData.discover_profile_id,
    is_active: state.datingReducer?.profile?.is_active,
  };
};

const AppNavigator = ({ user_id, is_active, discover_profile_id }) => {
  const chat_ref = collection(db, "chats");
  const query_ = query(
    chat_ref,
    where("members", "array-contains-any", [user_id, discover_profile_id]),
    orderBy("last_update", "desc"),
  );
  const [chats, chats_loading, error] = useCollectionData(query_);

  let all_chats = [];

  if (!chats_loading) {
    chats.forEach((x) => {
      if (x.lastMessageSent !== "v72wA14Hj4%2SDDR") {
        const uid = __get_chatAcc_id(x, x.is_dating_chat ? "d" : "");
        const sent_by_me = x.sent_by !== uid;
        // console.log({ sent_by_me });
        if (!x.opened && !sent_by_me) {
          all_chats.push(x);
        }
      }
    });
  }

  // console.log({ all_chats });

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
          tabBarLabel: "AskVI",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="questionnaire-line" color={color} size={size} />
          ),
        }}
        name={routes.ASKVI_NAVIGATOR}
        component={AskViNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Discover",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-astronaut" color={color} size={size} />
            // <AntDesign name="find" color={color} size={size + 3} />
          ),
          tabBarShowLabel: true,
        }}
        name={routes.DATING_NAVIGATOR}
        component={DatingNavigator}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     {
        //       is_active
        //         ? navigation.navigate(routes.DATING_CONTAINER)
        //         : navigation.navigate(routes.DATING_INTRO);
        //     }
        //   },
        // })}

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
          tabBarBadge: all_chats?.length > 0 ? all_chats?.length : null,
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
