import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Image as ImageLocal } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Ricons from "react-native-remix-icon";
import Button from "../components/Button";
import AppText from "../components/AppText";
import PostCard from "../components/PostCard";
import TabNavigator from "../components/TabNavigator";
import {
  get_auth_profile,
  get_user_profile,
  follow_account,
  unfollow_account,
} from "../store/actions/actions";
import { connect } from "react-redux";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";
import PostsTab from "../components/Profile/PostsTab";
import PicturesTab from "../components/Profile/PicturesTab";
import ProfileMenu from "../components/Profile/ProfileMenu";

import { Image } from "react-native-expo-image-cache";
import { useFocusEffect } from "@react-navigation/native";
import check_if_followed from "../util/check_if_followed";

import { ANONYMOUS_SETTINGS } from "../navigation/routes";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
    profile_page: state.data.profile_page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_auth_profile: () => dispatch(get_auth_profile()),
    get_user_profile: (username) => dispatch(get_user_profile(username)),
    follow_account: (username) => dispatch(follow_account(username)),
    unfollow_account: (username) => dispatch(unfollow_account(username)),
  };
};

const profile_tabs = [
  {
    title: "Posts",
    index: 1,
    icon: <Ricons color={colors.white} size={18} name="quill-pen-fill" />,
  },
  {
    title: "Pictures",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="picture-o" />,
  },
  {
    title: "Bookmarks",
    index: 3,
    icon: <FontAwesome color={colors.white} size={16} name="bookmark" />,
  },
];

function Profile({
  navigation,
  route,
  acc_data,
  get_auth_profile,
  get_user_profile,
  profile_page,
  follow_account,
  unfollow_account,
}) {
  const [index, setTab] = useState(1);
  const { username } = route.params;
  const [auth_profile, set_auth_profile] = useState(false);
  const [following, set_following] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      set_following(check_if_followed(profile_page.user.userID));
      setInit(true);
    }
  }, [profile_page]);

  useFocusEffect(
    React.useCallback(
      () => {
        if (check_if_auth_profile()) {
          get_auth_profile();
        } else {
          get_user_profile(username);
        }
      },
      [
        // username
      ],
    ),
  );

  const handleFollow = () => {
    let uid = profile_page.user.userID;
    if (following) {
      unfollow_account(uid);
      set_following(false);
    } else {
      follow_account(uid);
      set_following(true);
    }
  };

  const check_if_auth_profile = () => {
    if (username === acc_data.username) {
      set_auth_profile(true);
      return true;
    } else {
      set_auth_profile(false);
      return false;
    }
  };

  const tab_switcher = () => {
    switch (index) {
      case 2:
        return <PicturesTab />;
      default:
        return <PostsTab />;
    }
  };

  console.log(username);

  if (profile_page.loading_user) {
    return (
      <ProfileSkeleton
        notFound={profile_page.errors.notFound}
        username={username}
      />
    );
  }

  const { user } = profile_page;
  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_username}>{username}</Text>
            {auth_profile ? (
              <Button
                type={6}
                style={styles.toggle_anonymous}
                title="Toggle anonymous"
                onPress={() => navigation.navigate(ANONYMOUS_SETTINGS)}
              />
            ) : null}

            <View>
              <ProfileMenu username={username} />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderBottomColor: colors.black,
            borderBottomWidth: 4,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              {user.profilepic ? (
                <Image uri={user.profilepic} style={styles.profilepic} />
              ) : (
                <ImageLocal
                  source={require("../assets/avatar.png")}
                  style={styles.profilepic}
                />
              )}
            </View>
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.user_stream}>
                {user.yearOfStudy === "postgraduates" ? (
                  <>
                    Postgraduate{" "}
                    <Text style={{ color: colors.secondary }}>Student</Text>
                  </>
                ) : (
                  <>
                    {user.yearOfStudy} Year,{" "}
                    <Text style={{ color: colors.secondary }}>Student</Text>
                  </>
                )}
              </Text>
              {auth_profile ? (
                <View style={{ flexDirection: "row" }}>
                  <Button
                    style={styles.buttonShadow}
                    type={3}
                    title="Edit Profile"
                  />
                  <Button
                    style={{
                      marginLeft: 8,
                      paddingVertical: 7,
                      paddingHorizontal: 18,
                    }}
                    type={3}
                    title="Settings"
                  />
                </View>
              ) : (
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Button
                    type={8}
                    style={{
                      paddingHorizontal: 30,
                      ...styles.buttonShadow,
                    }}
                    onPress={handleFollow}
                    title={following ? "Following" : "Follow"}
                  />
                  <Button
                    // onPress={()=>navigation.navigate()}
                    style={{
                      marginLeft: 8,
                      paddingVertical: 7,
                      paddingHorizontal: 18,
                      ...styles.buttonShadow,
                    }}
                    type={3}
                    title="Message"
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            {auth_profile && user.anonymous_profile ? (
              <Text style={styles.anon_state}>Anonymous</Text>
            ) : null}

            <Text style={styles.user_f_name}>
              {user.firstname} {user.surname}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <AppText>
                {user.followers ? user.followers : 0}{" "}
                <AppText style={{ color: colors.secondary }}>Followers</AppText>
              </AppText>
              <AppText>&nbsp;|&nbsp;</AppText>
              <AppText>
                {user.following}{" "}
                <AppText style={{ color: colors.secondary }}>Following</AppText>
              </AppText>
            </View>

            {user.about ? (
              <View style={{ marginTop: 10 }}>
                <AppText>{user.about}</AppText>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <FontAwesome color={colors.secondary} name="university" size={15} />
            <AppText style={{ marginLeft: 8 }}>{user.university}</AppText>
          </View>
          {user?.degree ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <FontAwesome
                color={colors.secondary}
                name="graduation-cap"
                size={15}
              />
              <AppText style={{ marginLeft: 8 }}>{user.degree}</AppText>
            </View>
          ) : null}

          {user.number_of_markitems > 0 ||
            (auth_profile && (
              <View style={{ marginTop: 8 }}>
                <Button
                  type={3}
                  style={{ borderRadius: 100 }}
                  title="My Shop & Services"
                />
              </View>
            ))}
        </View>
        <View>
          <TabNavigator
            onPress={(i) => setTab(i)}
            active={index}
            items={auth_profile ? profile_tabs : profile_tabs.slice(0, 2)}
            style={{
              //   padding: 10,
              marginTop: 5,
              borderBottomWidth: 4,
              borderBottomColor: colors.black,
            }}
          />
        </View>
        <View>{tab_switcher()}</View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  user_f_name: {
    fontSize: 19,
    color: colors.white,
    marginTop: 5,
    fontWeight: "700",
  },
  anon_state: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: "500",
  },

  user_stream: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 17,
    paddingVertical: 2,
  },
  username: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 40,
  },
  profilepic: {
    height: 125,
    width: 125,
    borderRadius: 100,
  },
  toggle_anonymous_text: {
    color: colors.white,
    fontWeight: "700",
  },

  toggle_anonymous: {
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  header_username: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  container: {},
  header: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
