import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";
import TabNavigator from "../components/TabNavigator";

import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/Loaders/Loader";
import TopicTrends from "../components/Search/TopicTrends";
import SuggestedFriends from "../components/Search/SuggestedFriends";
import TopPosts from "../components/Search/TopPosts";
import SearchSkeleton from "../components/Skeletons/SearchSkeleton";
import { connect } from "react-redux";
import colors from "../config/colors";
import { get_search_data } from "../store/actions/actions";
import { useFocusEffect } from "@react-navigation/native";

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

const mapStateToProps = (state) => {
  return {
    search_page: state.data.search_page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_search_data: () => dispatch(get_search_data()),
  };
};

function SearchScreen({ search_page, get_search_data }) {
  const [activeTab, setTab] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      get_search_data();
    }, []),
  );

  if (search_page.loading) {
    return (
      <Screen>
        <SearchSkeleton />
      </Screen>
    );
  }

  const data = search_page.data;

  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* <SearchHeader /> */}
        {/* <View style={styles.devider} /> */}
        <View>
          <TopPosts posts={data.posts} />
          <TopicTrends trends={data.topics} />
          <SuggestedFriends accounts={data.accounts} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.primary,
    borderTopWidth: 0,
  },
  devider: {
    height: 2,
    width: "100%",
    backgroundColor: colors.black,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
