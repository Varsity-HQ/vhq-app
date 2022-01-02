import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";
import Button from "../components/Button";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import Screen from "../components/Screen";

export default function AddPostPage({ navigation }) {
  return (
    <>
      <Screen style={styles.container}>
        <ScrollView keyboardDismissMode="on-drag">
          <View>
            <Header
              backPress={() => navigation.goBack()}
              buttonText="Post"
              title="Create Post"
            />
            <AddPostH2 />
          </View>

          <View
            style={{
              flex: 1,
              // zIndex: 3,
            }}
          >
            <RTextEditor />
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          style={{
            // flex: 1,
            paddingBottom: 20,
          }}
          behavior="position"
        >
          <View>
            <View>
              <ScrollView
                horizontal
                style={{
                  marginTop: 20,
                  paddingVertical: 10,
                }}
              >
                <View style={styles.obutton}>
                  <MaterialCommunityIcons
                    name="image-plus"
                    color={colors.secondary}
                    size={30}
                  />
                </View>
                <View style={styles.obutton}>
                  <Foundation
                    name="graph-bar"
                    color={colors.secondary}
                    size={30}
                  />
                </View>
                <View style={styles.obutton}>
                  <Text style={styles.eventtext}>Event</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  eventtext: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "700",
  },
  obutton: {
    height: 90,
    width: 90,
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});
