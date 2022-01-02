import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native";
import Text from "../AppText";

function HeaderPostContent({ returnProfilePicture, loading = true }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.h_left_sec}>
          <Ionicons name="arrow-back-outline" color={colors.white} size={30} />
          <Text style={styles.h_username}>Loading post...</Text>
        </View>
        <View>
          <Ionicons
            name="ellipsis-horizontal-outline"
            color={colors.white}
            size={35}
          />
        </View>
      </View>
      {loading ? (
        <View
          style={[
            styles.header,
            {
              justifyContent: "center",
              paddingVertical: 50,
              borderBottomWidth: 0,
            },
          ]}
        >
          <ActivityIndicator color={colors.primary} animating size="large" />
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 15,
              borderBottomColor: colors.lighish,
              borderBottomWidth: 1,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={{ flexDirection: "row" }}>
                {returnProfilePicture(
                  "https://varsityhq.imgix.net/vhq_img202122286166.jpeg",
                  styles.p_avatar,
                )}
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.u_name}>Paballo M </Text>
                  <Text style={styles.username}>@pabie</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ paddingVertical: 20 }}>
              <AppText>Ole left the group</AppText>
            </View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.lighish,
              }}
            >
              <AppText style={styles.post_meta}>
                November 21, 2021 3:09PM ~ VasityHQ Iphone
              </AppText>
              <AppText style={styles.post_meta}>
                <FontAwesome
                  style={{ marginRight: 10 }}
                  name="university"
                  size={12}
                />
                &nbsp;University of Johannesburg
              </AppText>
            </View>
            <View
              style={{
                paddingVertical: 10,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FontAwesome color={colors.white} name="heart-o" size={20} />
                  <AppText style={{ fontSize: 15 }}>&nbsp;2 Likes</AppText>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <AppText style={{ fontSize: 15 }}>&nbsp;1 Comment</AppText>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FontAwesome color={colors.white} name="bookmark-o" size={25} />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  post_meta: {
    color: colors.secondary,
    fontSize: 14,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  container: {},
  h_username: {
    fontSize: 17,
    color: colors.white,
    marginLeft: 5,
    fontWeight: "700",
  },
  h_left_sec: {
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    padding: 10,
    borderBottomColor: colors.lighish,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default HeaderPostContent;
