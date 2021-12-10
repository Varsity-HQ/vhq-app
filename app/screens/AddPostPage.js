import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";

export default function AddPostPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        backPress={() => console.log("back")}
        buttonText="Cancel"
        title="Create Post"
      />
      <AddPostH2 />
      <RTextEditor />
      <Text>AddPostPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});
