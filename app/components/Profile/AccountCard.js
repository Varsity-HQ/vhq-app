import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PROFILE } from "../../navigation/routes";
import { connect } from "react-redux";
import check_if_followed from "../../util/check_if_followed";
import { follow_account, unfollow_account } from "../../store/actions/actions";

const width = Dimensions.get("window").width;

const mapDispatchToProps = (dispatch) => {
  return {
    follow_account: (uid) => dispatch(follow_account(uid)),
    unfollow_account: (uid) => dispatch(unfollow_account(uid)),
  };
};

function AccountCard({
  type,
  loading,
  data,
  follow_account,
  unfollow_account,
}) {
  const [following, setFollowing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let userid = data.userID;
    setFollowing(check_if_followed(userid));
  }, []);

  const handleAction = () => {
    if (following) return unfollowAccount();
    if (!following) return followAccount();
  };

  const unfollowAccount = () => {
    setFollowing(false);
    unfollow_account(data.userID);
  };
  const followAccount = () => {
    setFollowing(true);
    follow_account(data.userID);
  };

  if (loading || !data) {
    return (
      <View style={[styles.container, { borderWidth: 0 }]}>
        <Image skeleton style={styles.profilepage} />
        <Text
          style={{
            marginTop: 15,
            fontWeight: "700",
            color: colors.dark_opacity_2,
          }}
        >
          L ...
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ marginTop: 7, color: colors.dark_opacity_2 }}
        >
          -
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <Button
            type={3}
            textStyle={{
              color: colors.dark_opacity_2,
            }}
            style={{
              borderColor: colors.dark_opacity_2,
              backgroundColor: colors.dark_opacity_2,
              borderWidth: 1,
              borderRadius: 100,
              paddingHorizontal: 20,
            }}
            title="Go to account"
          />
        </View>
        {/* <View style={styles.container}></View> */}
      </View>
    );
  }

  if (type === 2) {
    return (
      <View
        style={[
          styles.container,
          {
            width: width / 3,
            marginRight: 0,
            borderWidth: 0,
            borderRadius: 0,
          },
        ]}
      >
        <View>
          <Image uri={data.profilepic} style={styles.profilepage2} />
          <Button
            type={3}
            content={
              <Feather
                name="external-link"
                size={18}
                color={colors.secondary}
              />
            }
            onPress={() =>
              navigation.navigate(PROFILE, {
                username: data.username,
              })
            }
            style={{
              padding: 8,
              backgroundColor: colors.dark_2,
              borderColor: colors.secondary,
              borderWidth: 1,
              borderRadius: 100,
              //   marginLeft: 5,
              position: "absolute",
              right: 0,
              //   bottom: 0,
              //   height: 50,
            }}
            title="Follow"
          />
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ marginTop: 10, fontWeight: "700", fontSize: RFValue(12) }}
        >
          {data.firstname}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            marginTop: 0,
            color: colors.secondary,
            fontSize: RFValue(12),
          }}
        >
          {data.yearOfStudy === "postgraduates"
            ? "Postgraduate"
            : `${data.yearOfStudy} year`}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 0 }}
        >
          {!following ? (
            <Button
              type={3}
              style={{
                borderColor: colors.dark_opacity_2,
                backgroundColor: colors.dark_opacity_2,
                borderWidth: 1,
                borderRadius: 100,
                paddingHorizontal: 10,
                width: "100%",
                paddingVertical: 6,
              }}
              onPress={handleAction}
              title={following ? "Following" : "Follow"}
            />
          ) : (
            <Button
              type={3}
              style={{
                borderColor: colors.dark_opacity_2,
                backgroundColor: colors.dark_opacity_2,
                borderWidth: 1,
                borderRadius: 100,
                paddingHorizontal: 10,
                width: "100%",
                paddingVertical: 6,
              }}
              onPress={() =>
                navigation.navigate(PROFILE, {
                  username: data.username,
                })
              }
              title={"Visit"}
            />
          )}
        </View>
        {/* <View style={styles.container}></View> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image uri={data.profilepic} style={styles.profilepage} />
      <Text style={{ marginTop: 15, fontWeight: "700" }}>{data.firstname}</Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ marginTop: 0, color: colors.secondary, fontSize: RFValue(12) }}
      >
        {data.degree ? data.degree : `${data.yearOfStudy} year`}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
      >
        <Button
          onPress={() =>
            navigation.navigate(PROFILE, {
              username: data.username,
            })
          }
          type={3}
          style={{
            borderColor: colors.dark_opacity_2,
            backgroundColor: colors.dark_opacity_2,
            borderWidth: 1,
            borderRadius: 100,
            paddingHorizontal: 20,
          }}
          title="Go to account"
        />
      </View>
      {/* <View style={styles.container}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  profilepage: {
    height: width * 0.22,
    width: width * 0.22,
    borderRadius: 100,
    marginTop: 10,
    backgroundColor: colors.dark_opacity_2,
  },
  profilepage2: {
    height: width * 0.28,
    width: width * 0.28,
    borderRadius: 100,
    marginTop: 10,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  container: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.dark_opacity_2,
    width: 200,
    // height: 300,
    // height: "100%",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default connect(null, mapDispatchToProps)(AccountCard);
