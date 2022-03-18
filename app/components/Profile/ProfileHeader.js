import React, { useEffect, useState } from "react";
import {
  View,
  Image as ImageLocal,
  TouchableOpacity,
  Alert,
} from "react-native";
import ProfileMenu from "../../components/Profile/ProfileMenu";
import Ricons from "react-native-remix-icon";
import Button from "../../components/Button";
import Text from "../../components/AppText";
import TabNavigator from "../../components/TabNavigator";
import colors from "../../config/colors";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-expo-image-cache";
import {
  ANONYMOUS_SETTINGS,
  CHAT_PAGE,
  PROFILE_SETTINGS,
  UPDATE_PROFILE_PAGE,
} from "../../navigation/routes";
import styles from "../../components/Profile/styles";
import { follow_account, unfollow_account } from "../../store/actions/actions";
import { set_following } from "../../store/actions/profile";

const mapStateToProps = (state) => {
  return {
    acc_data: state.core.accData,
    profile_page: state.profile,
    user: state.profile.user,
    tabIndex: state.profile.tabIndex,
    auth_profile: state.profile.is_auth_profile,
    following: state.profile.user_following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow_account: (username) => dispatch(follow_account(username)),
    unfollow_account: (username) => dispatch(unfollow_account(username)),
    set_following: (followed) => dispatch(set_following(followed)),
  };
};

const profile_tabs = [
  {
    title: "Posts",
    index: 1,
    icon: <Ricons color={colors.white} size={18} name="quill-pen-fill" />,
  },
  {
    title: "Recent Pictures",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="picture-o" />,
  },
  {
    title: "Bookmarks",
    index: 3,
    icon: <FontAwesome color={colors.white} size={16} name="bookmark" />,
  },
];

function ProfileHeader({
  profile_page,
  user,
  acc_data,
  username,
  auth_profile,
  setTab,
  handleTabChange,
  tabActive = 1,
  following,
  follow_account,
  unfollow_account,
  set_following,
}) {
  const navigation = useNavigation();

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

  return (
    <>
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
                source={require("../../assets/avatar.png")}
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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(CHAT_PAGE, {
                        uid: user.userID,
                        username: user.username,
                      })
                    }
                    style={styles.circle_btn}
                  >
                    <FontAwesome
                      size={22}
                      name="envelope"
                      color={colors.lighish2}
                    />
                  </TouchableOpacity>
                </View>
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
          marginBottom: 7,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text style={[styles.user_stream, styles.prof_inf]}>
          <FontAwesome5
            name="user-graduate"
            size={19}
            color={colors.lighish2}
          />
          {"  "}
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
                onPress={() =>
                  Alert.alert(
                    "Coming soon",
                    "This feature will be activated in the next release",
                  )
                }
                type={3}
                style={{ borderRadius: 100 }}
                title="My Shop & Services"
              />
            </View>
          ))}
      </View>
      <View>
        <TabNavigator
          onPress={(i) => handleTabChange(i)}
          active={tabActive}
          items={auth_profile ? profile_tabs : profile_tabs.slice(0, 2)}
          style={{
            //   padding: 10,
            marginTop: 5,
            borderBottomWidth: 4,
            borderBottomColor: colors.black,
          }}
        />
      </View>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
