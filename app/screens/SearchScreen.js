import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";
import TabNavigator from "../components/TabNavigator";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import Loader from "../components/Loaders/Loader";
import TopicTrends from "../components/Search/TopicTrends";

const iconSize = 20;

const tabs = [
  {
    index: 0,
    title: "Trending",
  },
  {
    index: 1,
    title: "Posts",
  },
  {
    index: 2,
    title: "Discover",
  },
];

function SearchScreen(props) {
  const [activeTab, setTab] = useState(0);
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <SearchHeader />
        <View>
          <TabNavigator
            onPress={(i) => setTab(i)}
            active={activeTab}
            items={tabs}
          />
        </View>
        <View style={styles.devider} />

        <View>
          <TopicTrends />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  devider: {
    height: 2,
    width: "100%",
    backgroundColor: colors.black,
  },
});

export default SearchScreen;
