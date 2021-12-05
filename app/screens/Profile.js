import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { View, StyleSheet, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Ricons from "react-native-remix-icon";
import Button from "../components/Button";
import AppText from "../components/AppText";
import PostCard from "../components/PostCard";
import TabNavigator from "../components/TabNavigator";

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

function Profile(props) {
  const [index, setTab] = useState(1);
  return (
    <Screen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_username}>chikx_12</Text>
            <View style={styles.toggle_anonymous}>
              <Text style={styles.toggle_anonymous_text}>Toggle anonymous</Text>
            </View>
            <View>
              <Ionicons
                color={colors.white}
                name="ios-ellipsis-horizontal-outline"
                size={34}
              />
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
              <Image
                source={{
                  uri: "https://varsityhq.imgix.net/vhq_img202130693415.jpeg",
                }}
                style={styles.profilepic}
              />
            </View>
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.username}>chikx_12</Text>
              <Text style={styles.user_stream}>
                3rd Year,{" "}
                <Text style={{ color: colors.secondary }}>Student</Text>
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
            <Text style={styles.anon_state}>Anonymous</Text>
            <Text style={styles.user_f_name}>Harrmony Chikari</Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <AppText>
                1{" "}
                <AppText style={{ color: colors.secondary }}>Followers</AppText>
              </AppText>
              <AppText>&nbsp;|&nbsp;</AppText>
              <AppText>
                1{" "}
                <AppText style={{ color: colors.secondary }}>Following</AppText>
              </AppText>
            </View>
            <View style={{ marginTop: 10 }}>
              <AppText>Creater of VHQ</AppText>
            </View>
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
            <AppText style={{ marginLeft: 8 }}>
              University of Johannesburg
            </AppText>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <FontAwesome
              color={colors.secondary}
              name="graduation-cap"
              size={15}
            />
            <AppText style={{ marginLeft: 8 }}>Computer Science</AppText>
          </View>
          <View style={{ marginTop: 8 }}>
            <Button
              type={3}
              style={{ borderRadius: 100 }}
              title="My Shop & Services"
            />
          </View>
        </View>
        <View>
          <TabNavigator
            onPress={(i) => setTab(i)}
            active={index}
            items={profile_tabs}
            style={{
              //   padding: 10,
              marginTop: 5,
              borderBottomWidth: 4,
              borderBottomColor: colors.black,
            }}
          />
        </View>
        <View>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </View>
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

export default Profile;
