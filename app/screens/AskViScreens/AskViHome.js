import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import HomeHeader from "../../components/AskVi/HomeHeader";
import { connect } from "react-redux";
import { get_home_questions } from "../../store/actions/askviPage";
import PostCard from "../../components/PostCard";
import { AlignJustify } from "react-native-remix-icon/src/icons";
import Button from "../../components/Button";

const tabs = [
  {
    title: "Recent",
    index: 1,
    icon: (
      <MaterialCommunityIcons
        color={colors.secondary}
        size={18}
        name="post-outline"
      />
    ),
  },
  {
    title: "Popular",
    index: 2,
    icon: <FontAwesome color={colors.secondary} size={16} name="line-chart" />,
  },
];

const mapStateToProps = (state) => {
  return {
    loading_recent: state.askvi.loading_recent,
    loading_more: state.askvi.loading_more,
    refreshing: state.askvi.refreshing,
    recent_questions: state.askvi.recent_questions,
    error: state.askvi.error,
    loading_top: state.askvi.loading_top,
    top_questions: state.askvi.top_questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_questions: (c) => dispatch(get_home_questions(c)),
  };
};

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

  componentDidMount = () => {
    this.props.get_home_questions({
      refresh: false,
      init: true,
      more: false,
      top: false,
    });
  };

  listRenderingHandler = ({ item }) => {
    if (this.state.activeTabIndex === 1) {
      return <PostCard navigation={this.props.navigation} data={item} />;
    }
    if (this.state.activeTabIndex === 2) {
      return <PostCard navigation={this.props.navigation} data={item} />;
    }

    return null;
  };

  refreshHandler = () => {
    this.props.get_home_questions({
      refresh: false,
      init: true,
      more: false,
      top: false,
    });
  };
  loadMoreHandler = () => {
    console.log("allowLoadMore triggered");
  };

  render() {
    return (
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
            keyExtractor: (item) => item.id,
            customLoader: <Text>loading</Text>,
            useCustomLoader: false,
            noDataComponent: <NoData />,
            allowRefresh: true,
            refreshHandler: this.refreshHandler,
            loadMoreHandler: this.loadMoreHandler,
          },
          {
            keyExtractor: (item) => item.id,
            noDataComponent: null,
            allowLoadMore: false,
            loadMoreHandler: this.loadMoreHandler,
          },
        ]}
        tabStates={[
          {
            loading: this.props.loading_recent,
            loading_more: this.props.loading_more,
            data: this.props.recent_questions,
            refreshing: this.props.refreshing,
          },
          {
            loading: this.props.loading_top,
            loading_more: this.props.loading_more,
            data: this.props.top_questions,
            refreshing: this.props.refreshing,
          },
        ]}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AskViHome);

const NoData = () => {
  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.dark_2,
          borderRadius: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.secondary,
              textAlign: "center",
            }}
          >
            No one has asked anything yet
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
          }}
        >
          <Button type={3} title="Ask something" />
        </View>
      </View>
    </View>
  );
};
