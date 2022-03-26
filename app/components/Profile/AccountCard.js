import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";

const width = Dimensions.get("window").width;

function AccountCard(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.profilepage} />
      <Text style={{ marginTop: 15, fontWeight: "700" }}>chikx_12</Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ marginTop: 7, color: colors.secondary }}
      >
        Harmony Chikari oepjspej eisoe
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
      >
        <Button
          type={3}
          style={{
            borderColor: colors.primary,
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
  },
  container: {
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary_2,
    width: 200,
    // height: 300,
    // height: "100%",
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default AccountCard;
