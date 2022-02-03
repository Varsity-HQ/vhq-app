import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";
import Text from "../AppText";
import Image from "../Image";
import Skeleton from "../Skeletons/SkeletonComponent";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useNavigation } from "@react-navigation/native";
import { POST_PAGE, PROFILE } from "../../navigation/routes";
dayjs.extend(localizedFormat);

function Notification({ data }) {
  const navigation = useNavigation();

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

  const handleNotificationPress = () => {
    if (data.type === "u_liked_post" && data.medium_id) {
      return navigation.navigate(POST_PAGE, {
        post_id: data.medium_id,
      });
    }

    return navigation.navigate(PROFILE, {
      username: data.username,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(PROFILE, {
            username: data.username,
          })
        }
        style={{ position: "relative" }}
      >
        <Image uri={data.profilepic} style={styles.profile_pic} />
        <View style={styles.new_indicator} />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handleNotificationPress}>
        <View>
          <Text>
            <Text style={styles.username}>@{data.username}</Text>&nbsp;
            {data.notification_text}
          </Text>
          <Text style={styles.date_created}>
            {dayjs(data.date_notified).fromNow()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  new_indicator: {
    height: 12,
    width: 12,
    borderRadius: 100,
    bottom: 0,
    right: 10,
    backgroundColor: colors.primary,
    borderColor: colors.dark,
    borderWidth: 2,
    position: "absolute",
  },
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
    paddingHorizontal: 10,
    position: "relative",
  },
  profile_pic: {
    height: 43,
    width: 43,
    borderRadius: 100,
    marginRight: 10,
  },
});

export default Notification;
