import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image as LocalImage,
  TouchableWithoutFeedback,
} from "react-native";

import Button from "../Button";
import Text from "../AppText";
import { Image } from "react-native-expo-image-cache";
import colors from "../../config/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import check_if_followed from "../../util/check_if_followed";
import * as routes from "../../navigation/routes";
import { follow_account, unfollow_account } from "../../store/actions/actions";

const sAccount = "jL5PPJzZuqWuqHLz7jb5ECS7cHu2";

const mapDispatchToProps = (dispatch) => {
  return {
    follow_account: (uid) => dispatch(follow_account(uid)),
    unfollow_account: (uid) => dispatch(unfollow_account(uid)),
  };
};

function AccountCont({
  data,
  follow_account,
  unfollow_account,
  removeButton,
  chat,
}) {
  const navigation = useNavigation();
  const [following, setFollowing] = useState(false);

  console.log(data);

  useFocusEffect(
    React.useCallback(() => {
      let userid = data.userID;
      setFollowing(check_if_followed(userid));
    }, []),
  );

  const handleAction = () => {
    if (following) return unfollowAccount();
    if (!following) return followAccount();
  };

  const handleChatAction = () => {
    navigation.navigate(routes.CHAT_PAGE, {
      uid: data.userID,
      username: data.username,
    });
  };

  const unfollowAccount = () => {
    setFollowing(false);
    unfollow_account(data.userID);
  };
  const followAccount = () => {
    setFollowing(true);
    follow_account(data.userID);
  };

  const returnDP = () => {
    if (!data.profilepic)
      return (
        <LocalImage
          style={styles.profilepic}
          source={require("../../assets/avatar.png")}
        />
      );

    return (
      <Image
        style={styles.profilepic}
        uri={data.profilepic}
        // uri={require("../../assets/avatar.png")}
        // defaultSource={require("../../assets/avatar.png")}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.push(routes.PROFILE, {
            username: data.username,
          })
        }
      >
        <View style={styles.leftsec}>
          {returnDP()}
          <View>
            <Text style={styles.name}>
              {data.firstname}&nbsp;{data.surname}
            </Text>

            <Text style={styles.uname}>
              @{data.username}&nbsp;&nbsp;
              <Text style={styles.yostudy}>
                {data.yearOfStudy === "postgraduates"
                  ? "Postgraduate"
                  : `${data.yearOfStudy} year`}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View>
        {!removeButton && data.userID !== sAccount && (
          <Button
            type={following ? 5 : 8}
            onPress={handleAction}
            title={following ? "Following" : "Follow"}
          />
        )}
        {chat && (
          <Button
            type={following ? 5 : 8}
            onPress={handleChatAction}
            title={"Message"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  yostudy: {
    paddingHorizontal: 10,
    // marginHorizontal: 10,
    backgroundColor: colors.darkish2,
    color: colors.secondary,
    fontSize: 15,
  },
  uname: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.secondary,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  leftsec: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profilepic: {
    height: 55,
    width: 55,
    borderRadius: 100,
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default connect(null, mapDispatchToProps)(AccountCont);
