import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image as ImageLocal,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Ricons from "react-native-remix-icon";
import Button from "../components/Button";
import Text from "../components/AppText";
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

import {
  ANONYMOUS_SETTINGS,
  PROFILE_SETTINGS,
  EDIT_PROFILE,
  UPDATE_PROFILE_PAGE,
} from "../navigation/routes";
import { normalizeText } from "../util/responsivePx";

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
    <Screen scroll>
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
          paddingTop: 20,
          paddingHorizontal: 10,
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
          <View
            style={{
              marginLeft: 18,
              flex: 1,
            }}
          >
            <View></View>

            {auth_profile ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    onPress={() => navigation.navigate(UPDATE_PROFILE_PAGE)}
                    style={styles.buttonShadow}
                    type={3}
                    title="Edit Profile"
                  />
                  <Button
                    onPress={() => navigation.navigate(PROFILE_SETTINGS)}
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
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Button
                  type={8}
                  textStyle={{
                    color: following ? colors.white : colors.lighish2,
                  }}
                  style={{
                    paddingHorizontal: 30,
                    ...styles.buttonShadow,
                    ...styles.buttonBorders,
                    backgroundColor: following ? colors.darkish3 : colors.dark,
                  }}
                  onPress={handleFollow}
                  title={following ? "Following" : "Follow"}
                />
                <View>
                  <TouchableOpacity style={styles.circle_btn}>
                    <FontAwesome
                      size={22}
                      name="envelope"
                      color={colors.lighish2}
                    />
                  </TouchableOpacity>
                </View>
                {/* <Button
              
                  // onPress={()=>navigation.navigate()}
                  style={{
                    marginLeft: 8,
                    paddingVertical: 7,
                    paddingHorizontal: 18,
                    ...styles.buttonShadow,
                  }}
                  type={3}
                  title="Message" 
                /> */}
              </View>
            )}
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text>
                {user.followers ? user.followers : 0}{" "}
                <Text style={{ color: colors.secondary }}>Followers</Text>
              </Text>
              <Text>&nbsp;|&nbsp;</Text>
              <Text>
                {user.following}{" "}
                <Text style={{ color: colors.secondary }}>Following</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {auth_profile && user.anonymous_profile ? (
            <Text style={styles.anon_state}>Anonymous</Text>
          ) : null}

          <Text style={styles.user_f_name}>
            {user.firstname} {user.surname}
          </Text>
          <Text style={styles.username}>@{user.username}</Text>
          {user.about ? (
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  color: colors.white,
                }}
              >
                {user.about}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 0,
          marginTop: 5,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text style={[styles.user_stream, styles.prof_inf]}>
          <MaterialCommunityIcons
            name="chair-school"
            size={19}
            color={colors.lighish2}
          />{" "}
          {user.yearOfStudy === "postgraduates" ? (
            <>
              Postgraduate <Text style={styles.user_stream}>Student</Text>
            </>
          ) : (
            <>
              {user.yearOfStudy} Year,{" "}
              <Text style={styles.user_stream}>Student</Text>
            </>
          )}
        </Text>
        <View
          style={[
            styles.prof_inf,
            { flexDirection: "row", alignItems: "center", marginTop: 0 },
          ]}
        >
          <FontAwesome color={colors.lighish2} name="university" size={13} />
          <Text style={[styles.user_stream, { marginLeft: 8 }]}>
            {user.university}
          </Text>
        </View>
        {user?.degree ? (
          <View
            style={[
              styles.prof_inf,
              {
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
              },
            ]}
          >
            <FontAwesome
              color={colors.lighish2}
              name="graduation-cap"
              size={13}
            />
            <Text style={[styles.user_stream, { marginLeft: 8 }]}>
              {user.degree}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        {user.number_of_markitems > 0 ||
          (auth_profile && (
            <View style={{ marginTop: 0 }}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonBorders: {
    borderColor: colors.lighish2,
    height: 45,
    borderRadius: 100,
  },
  circle_btn: {
    borderWidth: 1,
    borderColor: colors.lighish2,
    // padding: 12,
    borderRadius: 100,
    marginLeft: 10,
    height: 45,
    width: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkish3,
  },
  prof_inf: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
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
    fontSize: normalizeText(20),
    marginBottom: 5,
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
    color: colors.lighish2,
    fontWeight: "500",
    fontSize: normalizeText(13),
    paddingVertical: 2,
  },
  username: {
    color: colors.secondary,
    fontWeight: "500",
    marginBottom: 5,
    fontSize: normalizeText(14),
    // fontSize: 40,
  },
  profilepic: {
    height: 125,
    width: 125,
    borderRadius: 100,
    backgroundColor: colors.darkish,
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
