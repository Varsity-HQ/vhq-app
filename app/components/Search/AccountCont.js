import React from "react";
import { View, StyleSheet } from "react-native";

import Button from "../Button";
import Text from "../AppText";
import { Image } from "react-native-expo-image-cache";
import colors from "../../config/colors";

function AccountCont(props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftsec}>
        <Image
          style={styles.profilepic}
          uri="https://firebasestorage.googleapis.com/v0/b/varsityhq-bd225.appspot.com/o/vhq_img202156726730.jpeg?alt=media"
        />
        <View>
          <Text style={styles.name}>Thendo P</Text>
          <Text style={styles.uname}>
            @dopeeasy&nbsp;&nbsp;<Text style={styles.yostudy}>4th year</Text>
          </Text>
        </View>
      </View>
      <View>
        <Button type={8} title="Following" />
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

export default AccountCont;
