import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CHAT_HOME } from "./routes";
import ChatHome from "../screens/Chat/ChatHome";
import ChatRoomHome from "../screens/Chat/ChatRoomHome";
const Stack = createNativeStackNavigator();

const ChatNavigator = () => (
  <>
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName={CHAT_HOME}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={CHAT_HOME}
        component={ChatHome}
      />
    </Stack.Navigator>
  </>
);
export default ChatNavigator;
