import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import HomeHeader from "../../components/AskVi/HomeHeader";

const tabs = [
  {
    title: "Recent",
    index: 1,
    icon: (
      <MaterialCommunityIcons
        color={colors.white}
        size={18}
        name="post-outline"
      />
    ),
  },
  {
    title: "Popular",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="calendar-o" />,
  },
];

class AskViHome extends Component {
  state = {
    hashtag: null,
    activeTabIndex: 1,
    mockState: {
      loading_posts: false,
      posts: [1, 3],
      loading_more_posts: false,
      loading_events: false,
      events: [3],
      loading_more_events: false,
    },
  };

  setTabIndex = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  };

  componentDidMount = () => {};

  listRenderingHandler = ({ item }) => {
    if (this.state.activeTabIndex === 1) {
      return (
        <View>
          <Text>tab 1 card {item}</Text>
        </View>
      );
    }
    if (this.state.activeTabIndex === 2) {
      return (
        <View>
          <Text>tab 2 card {item}</Text>
        </View>
      );
    }

    return null;
  };

  refreshHandler = () => {
    console.log("triggered");
  };
  loadMoreHandler = () => {
    console.log("allowLoadMore triggered");
  };

  render() {
    return (
      <Screen style={[styles.container]}>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          setTabIndex={this.setTabIndex}
          tabStyle={2}
          removeTabBorder
          tabOptions={tabs}
          tabStyles={styles.tabStyles}
          TopHeader={<HomeHeader />}
          listRenderingHandler={this.listRenderingHandler}
          tabsConfig={[
            {
              keyExtractor: (item) => item,
              customLoader: <Text>loading</Text>,
              useCustomLoader: false,
              noDataComponent: (
                <View>
                  <Text>no data</Text>
                </View>
              ),
              allowRefresh: true,
              refreshHandler: this.refreshHandler,
            },
            {
              keyExtractor: (item) => item,
              noDataComponent: null,
              allowLoadMore: false,
              loadMoreHandler: this.loadMoreHandler,
            },
          ]}
          tabStates={[
            {
              loading: this.state.mockState.loading_posts,
              loading_more: this.state.mockState.loading_more_posts,
              data: this.state.mockState.posts,
              refreshing: false,
            },
            {
              loading: this.state.mockState.loading_events,
              loading_more: this.state.mockState.loading_more_events,
              data: this.state.mockState.events,
              refreshing: false,
            },
          ]}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  tabStyles: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    marginTop: 5,
  },
  container: {
    flex: 1,
    position: "relative",
    height: "100%",
  },
});

export default AskViHome;
