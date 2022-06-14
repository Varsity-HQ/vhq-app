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
import CSPhotos from "../screens/DatingScreens/CreateShow/CSPhotos";
import DatingContainer from "../screens/DatingScreens/DatingContainer";
import * as Location from "expo-location";
import DatingProfilePage from "../screens/DatingScreens/DatingProfilePage";
import MyDiscoverProfile from "../screens/DatingScreens/MyDiscoverProfile";
import useOnlinePresence from "../auth/useOnlinePresence";

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
      <Stack.Screen name={routes.CS_NAME} component={CSName} />
      <Stack.Screen name={routes.CS_LOOKING_FOR} component={CSLookingFor} />
      <Stack.Screen name={routes.CS_INTERESTED_IN} component={CSInterestedIn} />
      <Stack.Screen name={routes.CS_PHOTOS} component={CSPhotos} />
    </Stack.Navigator>
  );
};

const DatingNavigator = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useOnlinePresence();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // console.log({ text });
  // console.log({ location });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName={routes.DATING_INTRO}
    >
      {/* <Stack.Screen name={routes.CREATE_SHOW} component={CreateShowStack} /> */}
      <Stack.Screen name={routes.DATING_INTRO} component={DatingIntroScreen} />
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

      {/* 
      <Stack.Screen
        name={routes.DATING_ENCOUNTERS}
        component={DatingEncountersScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default DatingNavigator;
