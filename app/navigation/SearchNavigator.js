import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Profile from "../screens/Profile";
import Search from "../screens/SearchScreen";

import * as routes from "./routes";
import SearchHeader from "../components/Search/SearchHeader";
import colors from "../config/colors";
import SearchResults from "../screens/SearchResults";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import HeaderUserProfile from "../components/Search/HeaderUserProfile";
import HashtagScreen from "../screens/HashtagScreen";
import AllHashtags from "../screens/AllHashtags";
import ProfileSettingsScreen from "../screens/settings/ProfileSettingsScreen";

const SearchNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        presentation: "card",
        headerStyle: { backgroundColor: colors.dark },
        // header: () => (
        //   <SearchHeader
        //     stackName={"SearchNavigator"}
        //     navigation={navigation}
        //     route={route}
        //   />
        // ),
      })}
    ></Stack.Navigator>
  );
};

export default SearchNavigator;
