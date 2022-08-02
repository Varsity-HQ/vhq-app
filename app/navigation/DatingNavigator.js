import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import DatingIntroScreen from "../screens/DatingScreens/DatingIntroScreen";
// import DatingEncountersScreen from "../components/Dating/SwipeContainer";

import * as routes from "./routes";
import CSConfirmGender from "../screens/DatingScreens/CreateShow/CSConfirmGender";
import CSName from "../screens/DatingScreens/CreateShow/CSName";
import CSLookingFor from "../screens/DatingScreens/CreateShow/CSLookingFor";
import CSInterestedIn from "../screens/DatingScreens/CreateShow/CSInterestedIn";
import UpdateUniversityScreen from "../screens/settings/UpdateUniversityScreen";
import DatingContainer from "../screens/DatingScreens/DatingContainer";
import * as Location from "expo-location";
import DatingProfilePage from "../screens/DatingScreens/DatingProfilePage";
import MyDiscoverProfile from "../screens/DatingScreens/MyDiscoverProfile";
import CSAbout from "../screens/DatingScreens/CreateShow/CSAbout";
import { connect } from "react-redux";
import {
  initialize_discover_page,
  update_user_location,
} from "../store/actions/datingActions";
import CSMainInfo from "../screens/DatingScreens/CreateShow/CSMainInfo";
import PreferencesScreen from "../screens/settings/PreferencesScreen";
//
import UpdatebirthdayScreen from "../screens/settings/UpdatebirthdayScreen";
import UpdateGenderScreen from "../screens/settings/UpdateGenderScreen";
import UpdateRelationshipStatusScreen from "../screens/settings/UpdateRelationshipStatusScreen";
import UpdateSexualOrientaionScreen from "../screens/settings/UpdateSexualOrientaionScreen";
import UpdateSexTargetScreen from "../screens/settings/UpdateSexTargetScreen";
import MyDiscoverProfileHowDoILook from "../screens/DatingScreens/MyDiscoverProfileHowDoILook";
import DatingFilters from "../screens/DatingScreens/DatingFilters";
import ChatPage from "../screens/Chat/ChatPage";

const Stack = createNativeStackNavigator();

const CreateShowStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name={routes.CS_CONFIRM_GENDER}
        component={CSConfirmGender}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    accData: state.core.accData.userID,
    userID: state.core.accData.userID,
    is_active: state.datingReducer?.profile?.is_active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize_discover_page: () => dispatch(initialize_discover_page()),
    update_user_location: (data) => dispatch(update_user_location(data)),
  };
};

const DatingNavigator = ({
  initialize_discover_page,
  update_user_location,
}) => {
  useEffect(() => {
    initialize_discover_page();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        update_user_location(location);
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName={routes.DATING_CONTAINER}
    >
      {/* {!is_active && ( */}
      {/* <Stack.Screen name={routes.DATING_INTRO} component={DatingIntroScreen} /> */}
      {/* )} */}
      <Stack.Screen
        name={routes.DATING_CONTAINER}
        component={DatingContainer}
      />
      <Stack.Screen
        name={routes.DATING_PROFILE_PAGE}
        component={DatingProfilePage}
      />
      <Stack.Screen
        name={routes.MY_DISCOVER_PROFILE}
        component={MyDiscoverProfile}
      />
      {/* <Stack.Screen name={routes.CHAT_PAGE} component={ChatPage} /> */}

      <Stack.Screen
        name={routes.DATING_HDIL}
        component={MyDiscoverProfileHowDoILook}
      />
      <Stack.Screen name={routes.CS_LOOKING_FOR} component={CSLookingFor} />
      <Stack.Screen name={routes.CS_NAME} component={CSName} />
      <Stack.Screen name={routes.CS_ABOUT} component={CSAbout} />
      <Stack.Screen name={routes.CS_INTERESTED_IN} component={CSInterestedIn} />
      <Stack.Screen name={routes.CS_MAIN_INFO} component={CSMainInfo} />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_UNIVERSITY}
        component={UpdateUniversityScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.PREFERENCES}
        component={PreferencesScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_BIRTHDAY}
        component={UpdatebirthdayScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_GENDER}
        component={UpdateGenderScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_RELATIONSHIP_STATUS}
        component={UpdateRelationshipStatusScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_SO_STATUS}
        component={UpdateSexualOrientaionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.UPDATE_S_TARGET}
        component={UpdateSexTargetScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={routes.DATING_FILTERS}
        component={DatingFilters}
      />

      {/* 
      <Stack.Screen
        name={routes.DATING_ENCOUNTERS}
        component={DatingEncountersScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DatingNavigator);
