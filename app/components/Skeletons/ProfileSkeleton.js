import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../../config/colors";
import Screen from "../Screen";
import SkeletonComponent from "./SkeletonComponent";

import Text from "../AppText";

function ProfileSkeleton({ username = "User" }) {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_username}>{username}</Text>
          <View style={styles.toggle_anonymous}>
            <Text style={styles.toggle_anonymous_text}>Toggle anonymous</Text>
          </View>
          <View></View>
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
            <SkeletonComponent style={styles.profilepic} />
          </View>
          <View style={{ marginLeft: 18, width: "100%" }}>
            <SkeletonComponent style={styles.username}>
              {username}
            </SkeletonComponent>
            <SkeletonComponent style={styles.user_stream} />
            <View style={{ flexDirection: "row" }}>
              <View type={3} title="Edit Profile" />
              <View
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
          <SkeletonComponent style={styles.anon_state}></SkeletonComponent>
          <SkeletonComponent style={styles.user_f_name}></SkeletonComponent>
          <View
            style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
          >
            <SkeletonComponent
              style={{ height: 18, width: "20%" }}
            ></SkeletonComponent>
            <Text>&nbsp;|&nbsp;</Text>
            <SkeletonComponent
              style={{ height: 18, width: "20%" }}
            ></SkeletonComponent>
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            alignSelf: "center",
            padding: 20,
            color: colors.secondary,
          }}
        >
          Loading, please wait..
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user_f_name: {
    height: 21,
    color: colors.white,
    marginTop: 5,
    fontWeight: "700",
    width: "50%",
  },
  anon_state: {
    height: 17,
    width: "30%",
    color: colors.secondary,
    fontWeight: "500",
  },

  user_stream: {
    color: colors.white,
    height: 19,
    width: "50%",
    paddingVertical: 2,
  },
  username: {
    color: colors.white,
    fontWeight: "700",
    height: 38,
    width: "40%",
    marginBottom: 8,
  },
  profilepic: {
    height: 125,
    width: 125,
    borderRadius: 100,
  },
  toggle_anonymous_text: {
    color: colors.dark,
    fontWeight: "700",
  },
  toggle_anonymous: {
    borderColor: colors.dark,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  header_username: {
    color: colors.white,
    fontWeight: "700",
    height: 20,
    width: "35%",
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

export default ProfileSkeleton;