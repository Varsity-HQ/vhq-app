import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";
import Text from "../AppText";
import Image from "../Image";
import Skeleton from "../Skeletons/SkeletonComponent";

function Notification({ data }) {
  if (!data) {
    return (
      <View style={styles.container}>
        <View>
          <Skeleton duration={2000} style={styles.profile_pic} />
        </View>
        <View style={{ flex: 1 }}>
          <Skeleton style={styles.username_sk} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.profile_pic} />
      </View>
      <View>
        <Text>
          <Text style={styles.username}>@chikx_12</Text> liked your post
        </Text>
        <Text style={styles.date_created}>2 hours ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontWeight: "700",
  },
  username_sk: {
    height: 17,
    width: "56%",
  },
  date_created: {
    fontSize: normalizeText(13),
    color: colors.secondary,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profile_pic: {
    height: 43,
    width: 43,
    borderRadius: 100,
    marginRight: 10,
  },
});

export default Notification;
