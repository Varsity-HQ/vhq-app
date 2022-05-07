import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../HashtagScreen/Header";
import colors from "../../config/colors";
import { connect } from "react-redux";
import PostCard from "../../components/PostCard";
import {
  get_posts,
  set_hashtag,
  get_pictures,
} from "../../store/actions/hashtagPage";

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
    title: "Pictures",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="picture-o" />,
  },
];

const mapStateToProps = (state) => {
  return {
    loading_posts: state.hashtagPage.loading_posts,
    loading_more_posts: state.hashtagPage.loading_more_posts,
    posts: state.hashtagPage.posts,
    refreshing_posts: state.hashtagPage.refreshing_posts,
    //
    loading_pictures: state.hashtagPage.loading_pictures,
    loading_more_pics: state.hashtagPage.loading_more_pics,
    pictures: state.hashtagPage.pictures,
    refreshing_pictures: state.hashtagPage.refreshing_pictures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_posts: (state) => dispatch(get_posts(state)),
    get_pictures: (state) => dispatch(get_pictures(state)),
    set_hashtag: (h) => dispatch(set_hashtag(h)),
  };
};

class index extends Component {
  state = {
    hashtag: null,
    activeTabIndex: 1,
  };

  setTabIndex = (index) => {
    this.setState({
      activeTabIndex: index,
    });

    if (index === 1) {
      this.props.get_posts();
    }
    if (index === 2) {
      this.props.get_pictures();
    }
  };

  componentDidMount = () => {
    let hashtag = this.props.route.params.hashtag;

    this.setState({
      hashtag: hashtag,
    });

    this.props.set_hashtag(hashtag);
    this.props.get_posts();
  };

  listRenderingHandler = ({ item }) => {
    return <PostCard data={item} navigation={this.props.navigation} />;
  };

  refreshHandler = () => {};
  loadMoreHandler = () => {};

  render() {
    const {
      loading_posts,
      loading_more_posts,
      posts,
      refreshing_posts,
      loading_pictures,
      loading_more_pics,
      pictures,
      refreshing_pictures,
    } = this.props;

    return (
      <Screen>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          setTabIndex={this.setTabIndex}
          tabOptions={tabs}
          TopHeader={<Header hashtag={this.state.hashtag} />}
          listRenderingHandler={this.listRenderingHandler}
          tabsConfig={[
            {
              keyExtractor: (item) => item.id,
              useCustomLoader: false,
              noDataComponent: (
                <View
                  style={{
                    padding: 30,
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text>no posts</Text>
                </View>
              ),
              allowRefresh: false,
              refreshHandler: this.refreshHandler,
            },
            {
              keyExtractor: (item) => item.id,
              noDataComponent: (
                <View
                  style={{
                    padding: 30,
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text>no pictures</Text>
                </View>
              ),
              allowLoadMore: false,
              loadMoreHandler: this.loadMoreHandler,
            },
          ]}
          tabStates={[
            {
              loading: loading_posts,
              loading_more: loading_more_posts,
              data: posts,
              refreshing: refreshing_posts,
            },
            {
              loading: loading_pictures,
              loading_more: loading_more_pics,
              data: pictures,
              refreshing: refreshing_pictures,
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
