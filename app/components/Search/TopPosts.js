import React from "react";
import { ScrollView } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "../AppText";
import TopPost from "./TopPost";

function TopPosts(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: colors.black,
          borderBottomWidth: 1,
        }}
      >
        <Text style={styles.header}>Top at UJ</Text>
      </View>
      <View>
        <ScrollView horizontal>
          <TopPost />
          <TopPost />
          <TopPost />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkish,
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    padding: 10,
  },
});

export default TopPosts;
