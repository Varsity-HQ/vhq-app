import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import { ADD_POST, ASKVI_HOME } from "./routes";
import AskViHome from "../screens/AskViScreens/AskViHome";
import AddPostPage from "../screens/AddPostPage";

const Stack = createNativeStackNavigator();

const s_options = {
  headerShown: false,
};

const AskViNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName={ASKVI_HOME}
    >
      <Stack.Screen
        options={s_options}
        name={ADD_POST}
        component={AddPostPage}
      />
      <Stack.Screen
        options={s_options}
        name={ASKVI_HOME}
        component={AskViHome}
      />
    </Stack.Navigator>
  );
};

export default AskViNavigator;
