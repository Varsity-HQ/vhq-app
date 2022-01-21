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

const SearchNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: colors.dark },
        header: () => (
          <SearchHeader
            stackName={"SearchNavigator"}
            navigation={navigation}
            route={route}
          />
        ),
      })}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          animationTypeForReplace: "push",
        }}
        name={routes.SEARCH}
        component={Search}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          gestureEnabled: false,
          animation: "fade",
          headerRight: () => (
            <Button
              type={4}
              style={{ paddingVertical: 8 }}
              onPress={() => navigation.navigate(routes.SEARCH)}
              title="Cancel"
            />
          ),
        }}
        name={routes.SEARCH_RESULTS}
        component={SearchResults}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={routes.PROFILE}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
