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
  get_user_page,
  get_auth_profile,
  get_user_profile,
} from "../store/actions/actions";
import { connect } from "react-redux";
import ProfileSkeleton from "../components/Skeletons/ProfileSkeleton";
import PostsTab from "../components/Profile/PostsTab";
import PicturesTab from "../components/Profile/PicturesTab";
import ProfileMenu from "../components/Profile/ProfileMenu";

import { Image } from "react-native-expo-image-cache";
import { useFocusEffect } from "@react-navigation/native";

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
  route,
  acc_data,
  get_auth_profile,
  get_user_profile,
  profile_page,
}) {
  const [index, setTab] = useState(1);
  const { username } = route.params;
  const [auth_profile, set_auth_profile] = useState(false);

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
  } //

  const { user } = profile_page;
  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_username}>{username}</Text>
            {auth_profile ? (
              <View style={styles.toggle_anonymous}>
                <Text style={styles.toggle_anonymous_text}>
                  Toggle anonymous
                </Text>
              </View>
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
              <View style={{ flexDirection: "row" }}>
                <Button type={3} title="Edit Profile" />
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
