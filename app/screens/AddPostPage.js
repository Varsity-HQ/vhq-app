import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";
import Button from "../components/Button";

export default function AddPostPage({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header
          backPress={() => console.log("back")}
          buttonText="Cancel"
          title="Create Post"
        />
        <AddPostH2 />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <RTextEditor />
        </KeyboardAvoidingView>
        <View>
          <View>
            <ScrollView></ScrollView>
          </View>

          <Button style={{ fontWeight: "700" }} type={4} title="Post" />
        </View>
        <Text>AddPostPages</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});
