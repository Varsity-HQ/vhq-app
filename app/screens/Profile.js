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
    profile_screen_moved_away: () => dispatch(profile_screen_moved_away()),
  };
};

// const ProfileContainer = (props) => {
//   const [index, setTab] = useState(1);
//   const { username } = props.route.params;
//   const [auth_profile, set_auth_profile] = useState(true);
//   const [init, setInit] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       if (check_if_auth_profile()) {
//         props.get_auth_profile();
//         console.log("my profile");
//       } else {
//         console.log("other profile");
//         // get_user_profile(username);
//         // set_following(check_if_followed(props.profile_page.user.userID));
//       }
//       return () => {
//         console.log("moved away");
//         props.profile_screen_moved_away();
//       };
//     }, []),
//   );

//   // useEffect(() => {
//   //   if (!init) {
//   //     // set_following(check_if_followed(props.profile_page.user.userID));
//   //     setInit(true);
//   //   }
//   // }, [props.profile_page]);

//   const check_if_auth_profile = () => {
//     if (username === props.acc_data.username) {
//       set_auth_profile(true);
//       return true;
//     } else {
//       set_auth_profile(false);
//       return false;
//     }
//   };

//   return (
//     <Profile
//       auth_profile={auth_profile}
//       username={username}
//       passed_props={props}
//     />
//   );
// };

class Profile extends PureComponent {
  // tab_switcher = () => {
  //   switch (index) {
  //     case 2:
  //       return <PicturesTab />;
  //     default:
  //       return <PostsTab />;
  //   }
  // };

  state = {
    tabActive: 1,
  };

  componentDidMount = () => {
    console.log("page first load");
    this.props.get_posts();
  };

  componentWillUnmount = () => {
    console.log("bye");
    this.props.profile_screen_moved_away();
  };

  handleLoadMore = () => {
    if (this.state.tabActive === 1) {
      this.props.get_posts(true);
    }
  };

  handleTabChange = (tab) => {
    this.setState({
      tabActive: tab,
    });
  };

  handleListRendering = ({ item }) => (
    <PostCard
      navigation={this.props.navigation}
      data={{ ...item, ...this.props.profile_page.user }}
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

    const { posts, loading_post } = this.props.profile_page;

    return (
      <Screen>
        <FlatList
          onEndReached={() => this.handleLoadMore()}
          onEndReachedThreshold={0.8}
          initialNumToRender={10}
          renderItem={this.handleListRendering}
          keyExtractor={(item) => item.id}
          data={loading_post ? [] : posts}
          ListHeaderComponent={
            <ProfileHeader
              handleTabChange={this.handleTabChange}
              tabActive={this.state.tabActive}
              username={username}
            />
          }
          ListFooterComponent={() => (
            <FooterLoadings
              tab={this.state.tabActive}
              loading={this.props.profile_page.loading_post}
              loading_more={this.props.profile_page.loading_more_posts}
            />
          )}
        />
      </Screen>
    );
  }
}

const FooterLoadings = ({ loading, tab, loading_more }) => {
  if (tab === 1 && loading) {
    return (
      <View>
        <PostLoader />
        <PostLoader />
      </View>
    );
  }

  if (tab === 1 && loading_more) {
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

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
