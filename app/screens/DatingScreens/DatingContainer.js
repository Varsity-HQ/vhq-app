import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import Header from "../../components/Dating/Header";
import DatingCard from "../../components/Dating/DatingCard";
import * as geofire from "geofire-common";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import FloatingButton from "../../components/FloatingButton";
import { connect } from "react-redux";
import DatingIntroScreen from "./DatingIntroScreen";

const icon_size = 35;
const color_active = colors.white;
const color_inactive = colors.secondary_2;

const mapStateToProps = (state) => {
  return {
    loading: state.datingReducer.profile.loading,
    is_active: state.datingReducer.profile.is_active,
  };
};

const tabs = [
  {
    title: "Browse",
    index: 1,
    icon: (
      <MaterialIcons name="explore" size={icon_size} color={color_inactive} />
    ),
    icon_a: (
      <MaterialIcons name="explore" size={icon_size} color={color_active} />
    ),
  },
  {
    title: "Likes",
    index: 2,
    icon: (
      <MaterialIcons
        name="offline-bolt"
        size={icon_size}
        color={color_inactive}
      />
    ),
    icon_a: (
      <MaterialIcons
        name="offline-bolt"
        size={icon_size}
        color={color_active}
      />
    ),
  },
  {
    title: "Chats",
    index: 3,
    icon: (
      <Ionicons
        name="navigate-circle"
        size={icon_size}
        color={color_inactive}
      />
    ),
    icon_a: (
      <Ionicons name="navigate-circle" size={icon_size} color={color_active} />
    ),
  },
];

class DatingContainer extends React.Component {
  state = {
    activeTabIndex: 1,
    mockState: {
      loading_posts: false,
      posts: [1, 3, 2],
      loading_more_posts: false,
      loading_events: false,
      events: [3],
      loading_more_events: false,
    },
  };

  componentDidMount = () => {
    const lat = 1.5074;
    const lng = 4.1178;

    console.log("mounted");

    const hash = geofire.geohashForLocation([lat, lng]);
    console.log({ hash });
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
      return <DatingCard />;
    }

    return null;
  };

  refreshHandler = () => {};
  loadMoreHandler = () => {};

  render() {
    if (this.props.loading) {
      return <DatingIntroScreen loading={true} />;
    }
    if (!this.props.loading && !this.props.is_active) {
      return <DatingIntroScreen loading={false} />;
    }

    return (
      <Screen>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          // setTabIndex={this.setTabIndex}
          //   tabOptions={tabs}
          numColumns={2}
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
        <FloatingButton dating />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, null)(DatingContainer);
