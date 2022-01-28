import React, { useEffect, useState, PureComponent } from "react";
import {
  View,
  StyleSheet,
  Image as ImageLocal,
  Touchable,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";

import Ricons from "react-native-remix-icon";
import Button from "../components/Button";
import Text from "../components/AppText";
import TabNavigator from "../components/TabNavigator";
import {
  get_auth_profile,
  get_user_profile,
  profile_screen_moved_away,
  get_posts,
  get_pictures,
  get_auth_bookmarks,
} from "../store/actions/profile";
import { follow_account, unfollow_account } from "../store/actions/actions";
import { connect } from "react-redux";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";
import PostsTab from "../components/Profile/PostsTab";
import PicturesTab from "../components/Profile/PicturesTab";
import ProfileMenu from "../components/Profile/ProfileMenu";
import PostLoader from "../components/Skeletons/Post";
import { Image } from "react-native-expo-image-cache";
import { useFocusEffect } from "@react-navigation/native";
import check_if_followed from "../util/check_if_followed";

import {
  ANONYMOUS_SETTINGS,
  PROFILE_SETTINGS,
  EDIT_PROFILE,
  UPDATE_PROFILE_PAGE,
} from "../navigation/routes";
import { normalizeText } from "../util/responsivePx";
import ProfileHeader from "../components/Profile/ProfileHeader";
import styles from "../components/Profile/styles";
import PostCard from "../components/PostCard";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
    profile_page: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_auth_profile: () => dispatch(get_auth_profile()),
    get_user_profile: (username) => dispatch(get_user_profile(username)),
    follow_account: (username) => dispatch(follow_account(username)),
    unfollow_account: (username) => dispatch(unfollow_account(username)),

    //
    get_posts: (more) => dispatch(get_posts(more)),
    get_pictures: (more) => dispatch(get_pictures(more)),
    get_auth_bookmarks: (more) => dispatch(get_auth_bookmarks(more)),
    profile_screen_moved_away: () => dispatch(profile_screen_moved_away()),
  };
};

class Profile extends PureComponent {
  state = {
    tabActive: 1,
  };

  componentDidMount = () => {
    console.log("page first load");
    this.props.get_posts();
    this.props.get_user_profile(this.props.route.params.username);
  };

  componentWillUnmount = () => {
    console.log("bye");
    this.props.profile_screen_moved_away();
  };

  handleLoadMore = () => {
    if (this.state.tabActive === 1) {
      this.props.get_posts(true);
    }
    // if (this.state.tabActive === 2) {
    //   this.props.get_pictures(true);
    // }
  };

  load_account_pictures = () => {
    this.props.get_pictures();
  };

  handleTabChange = (tab) => {
    this.setState({
      tabActive: tab,
    });

    if (tab === 1) {
      this.props.get_pictures();
    }

    if (tab === 2) {
      this.load_account_pictures();
    }
    if (tab === 3) {
      this.props.get_auth_bookmarks();
    }
  };

  handleListRendering = ({ item }) => (
    <PostCard
      hideFollowBtn={true}
      navigation={this.props.navigation}
      data={
        this.state.tabActive !== 3
          ? { ...item, ...this.props.profile_page.user }
          : item
      }
    />
  );

  render() {
    // const {
    //   navigation,
    //   route,
    //   acc_data,
    //   get_auth_profile,
    //   get_user_profile,
    //   profile_page,
    //   follow_account,
    //   unfollow_account,
    // } = this.props;

    // const { user } = profile_page;

    const { username } = this.props.route.params;

    if (this.props.profile_page.loading_user) {
      return (
        <ProfileSkeleton
          notFound={this.props.profile_page.errors.notFound}
          username={username}
        />
      );
    }

    const {
      posts,
      pictures,
      loading_post,
      loading_pictures,
      loading_more_pictures,
      loading_more_posts,
      bookmarks,
      loading_bookmarks,
      loading_more_bookmarks,
    } = this.props.profile_page;

    return (
      <Screen>
        <FlatList
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          renderItem={this.handleListRendering}
          keyExtractor={(item) => item.id}
          data={
            this.state.tabActive === 1
              ? loading_post
                ? []
                : posts
              : this.state.tabActive === 2
              ? loading_pictures
                ? []
                : pictures
              : this.state.tabActive === 3
              ? bookmarks
              : []
          }
          ListHeaderComponent={
            <ProfileHeader
              handleTabChange={this.handleTabChange}
              tabActive={this.state.tabActive}
              username={username}
            />
          }
          ListFooterComponentStyle={{
            paddingBottom: 60,
            marginBottom: 60,
          }}
          ListFooterComponent={
            <FooterLoadings
              tab={this.state.tabActive}
              data={
                this.state.tabActive === 1
                  ? loading_post
                    ? []
                    : posts
                  : this.state.tabActive === 2
                  ? loading_pictures
                    ? []
                    : pictures
                  : this.state.tabActive === 3
                  ? bookmarks
                  : []
              }
              loading={
                this.state.tabActive === 1
                  ? loading_post
                  : this.state.tabActive === 2
                  ? loading_pictures
                  : this.state.tabActive === 3
                  ? loading_bookmarks
                  : loading_post
              }
              loading_more={
                this.state.tabActive === 1
                  ? loading_more_posts
                  : this.state.tabActive === 2
                  ? loading_more_pictures
                  : this.state.tabActive === 3
                  ? loading_more_bookmarks
                  : loading_more_posts
              }
            />
          }
        />
      </Screen>
    );
  }
}

const FooterLoadings = ({ loading, tab, loading_more, data = [] }) => {
  if (loading) {
    return (
      <View>
        <PostLoader />
        <PostLoader />
      </View>
    );
  }

  if (loading_more) {
    return (
      <View
        style={{
          padding: 30,
        }}
      >
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  }

  if (tab === 1 && data.length === 0) {
    return (
      <View
        style={{
          padding: 30,
        }}
      >
        <Text style={{ alignSelf: "center", color: colors.secondary }}>
          No posts
        </Text>
      </View>
    );
  }
  if (tab === 2 && data.length === 0) {
    return (
      <View
        style={{
          padding: 30,
        }}
      >
        <Text style={{ alignSelf: "center", color: colors.secondary }}>
          No pictures
        </Text>
      </View>
    );
  }
  if (tab === 3 && data.length === 0) {
    return (
      <View
        style={{
          padding: 30,
        }}
      >
        <Text style={{ alignSelf: "center", color: colors.secondary }}>
          No bookmarks
        </Text>
      </View>
    );
  }

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
