import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Header from "../../components/Dating/Header";
import DatingCard from "../../components/Dating/DatingCard";

const tabs = [
  {
    title: "Explore",
    index: 1,
  },
  {
    title: "Chats",
    index: 2,
  },
];

class DatingContainer extends React.Component {
  state = {
    activeTabIndex: 1,
    mockState: {
      loading_posts: false,
      posts: [1, 3, 2, 4, 6],
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

  listRenderingHandler = ({ item }) => {
    if (this.state.activeTabIndex === 1) {
      return <DatingCard />;
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

  refreshHandler = () => {};
  loadMoreHandler = () => {};

  render() {
    return (
      <Screen>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          // setTabIndex={this.setTabIndex}
          //   tabOptions={tabs}
          numColumns={3}
          removeTabBorder={true}
          TopHeader={
            <Header
              setTabIndex={this.setTabIndex}
              activeTabIndex={this.state.activeTabIndex}
              tabs={tabs}
            />
          }
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
  container: {},
});

export default DatingContainer;
