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
import { connect } from "react-redux";
import { flag_notification_opened } from "../../store/actions/notifications";
import { RFValue } from "react-native-responsive-fontsize";
import emojis from "../../util/emojis";
dayjs.extend(localizedFormat);

const mapDispatchToProps = (dispatch) => {
  return {
    flag_notification_opened: (id) => dispatch(flag_notification_opened(id)),
  };
};

function Notification({ data, flag_notification_opened }) {
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
    if (data.type === "u_commented_on_post" && data.medium_id) {
      flag_notification_opened(data.id);
      return navigation.navigate(POST_PAGE, {
        post_id: data.medium_id,
      });
    }
    if (data.type === "u_liked_post" && data.medium_id) {
      flag_notification_opened(data.id);
      return navigation.navigate(POST_PAGE, {
        post_id: data.medium_id,
      });
    }

    flag_notification_opened(data.id);
    return navigation.push(PROFILE, {
      username: data.username,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.push(PROFILE, {
            username: data.username,
          })
        }
        style={{ position: "relative" }}
      >
        <Image
          local={data.anonymous}
          uri={
            data.anonymous ? { uri: emojis[data.profilepic] } : data.profilepic
          }
          style={styles.profile_pic}
        />
        {!data.n_seen ? <View style={styles.new_indicator} /> : null}
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={handleNotificationPress}>
        <View style={{ flex: 1 }}>
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
    marginTop: 5,
    fontSize: RFValue(12),
    color: colors.secondary,
  },
  container: {
    flexDirection: "row",
    // alignItems: "center",
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

export default connect(null, mapDispatchToProps)(Notification);
