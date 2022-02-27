import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const tabs = [
  {
    title: "Posts",
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
    title: "Events",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="calendar-o" />,
  },
  {
    title: "Offers",
    index: 4,
    icon: <FontAwesome color={colors.white} size={16} name="tags" />,
  },
];

class index extends Component {
  state = {
    hashtag: null,
    activeTabIndex: 1,
    mockState: {
      loading_posts: true,
      posts: [1, 2, 3],
      loading_more_posts: false,
      loading_events: true,
      events: [1, 2, 4, 5],
      loading_more_events: false,
    },
  };

  setTabIndex = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  };

  componentDidMount = () => {
    this.setState({
      hashtag: this.props.route.params.hashtag,
    });
  };

  render() {
    return (
      <Screen>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          setTabIndex={this.setTabIndex}
          tabOptions={tabs}
          TopHeader={<Text>header component</Text>}
          tabsConfig={[
            {
              tabIndex: 1,
              renderItem: (
                <View>
                  <Text>Post component</Text>
                </View>
              ),
              keyExtractor: ({ item }) => item,
              customLoader: <Text>loading</Text>,
              useCustomLoader: true,
            },
            {
              tabIndex: 2,
              renderItem: (
                <View>
                  <Text>Event Component</Text>
                </View>
              ),
              keyExtractor: ({ item }) => item,
            },
          ]}
          tabStates={[
            {
              index: 1,
              loading: this.state.mockState.loading_posts,
              loading_more: this.state.mockState.loading_more_posts,
              data: this.state.mockState.posts,
            },
            {
              index: 2,
              loading: this.state.mockState.loading_events,
              loading_more: this.state.mockState.loading_more_events,
              data: this.state.mockState.events,
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

export default index;
