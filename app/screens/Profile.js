import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image as ImageLocal,
  Touchable,
  TouchableOpacity,
  FlatList,
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
} from "../store/actions/profile";
import { follow_account, unfollow_account } from "../store/actions/actions";
import { connect } from "react-redux";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";
import PostsTab from "../components/Profile/PostsTab";
import PicturesTab from "../components/Profile/PicturesTab";
import ProfileMenu from "../components/Profile/ProfileMenu";

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
    profile_screen_moved_away: () => dispatch(profile_screen_moved_away()),
  };
};

const ProfileContainer = (props) => {
  const [index, setTab] = useState(1);
  const { username } = props.route.params;
  const [auth_profile, set_auth_profile] = useState(true);
  const [init, setInit] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (check_if_auth_profile()) {
        props.get_auth_profile();
        console.log("my profile");
      } else {
        console.log("other profile");
        // get_user_profile(username);
        // set_following(check_if_followed(props.profile_page.user.userID));
      }
      return () => {
        console.log("moved away");
        props.profile_screen_moved_away();
      };
    }, []),
  );

  // useEffect(() => {
  //   if (!init) {
  //     // set_following(check_if_followed(props.profile_page.user.userID));
  //     setInit(true);
  //   }
  // }, [props.profile_page]);

  const check_if_auth_profile = () => {
    if (username === props.acc_data.username) {
      set_auth_profile(true);
      return true;
    } else {
      set_auth_profile(false);
      return false;
    }
  };

  return (
    <Profile
      auth_profile={auth_profile}
      username={username}
      passed_props={props}
    />
  );
};

class Profile extends React.PureComponent {
  // tab_switcher = () => {
  //   switch (index) {
  //     case 2:
  //       return <PicturesTab />;
  //     default:
  //       return <PostsTab />;
  //   }
  // };

  state = {
    tabIndex: 0,
  };

  componentDidMount = () => {
    console.log("start");
  };

  render() {
    const {
      navigation,
      route,
      acc_data,
      get_auth_profile,
      get_user_profile,
      profile_page,
      follow_account,
      unfollow_account,
    } = this.props.passed_props;

    // const { user } = profile_page;

    if (profile_page.loading_user) {
      return (
        <ProfileSkeleton
          notFound={profile_page.errors.notFound}
          username={this.props.username}
        />
      );
    }

    return (
      <Screen>
        <FlatList
          ListHeaderComponent={() => (
            <ProfileHeader
              auth_profile={this.props.auth_profile}
              username={this.props.username}
            />
          )}
        />
        {/* <View>{tab_switcher()}</View> */}
      </Screen>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
