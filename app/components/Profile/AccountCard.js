import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const width = Dimensions.get("window").width;

function AccountCard({ type, loading }) {
  if (loading) {
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
          <Image style={styles.profilepage2} />
          <Button
            type={3}
            content={
              <Feather name="external-link" size={18} color={colors.white} />
            }
            style={{
              backgroundColor: colors.dark_2,
              borderColor: colors.secondary,
              borderWidth: 2,
              borderRadius: 100,
              marginLeft: 5,
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
          style={{ marginTop: 15, fontWeight: "700", fontSize: RFValue(15) }}
        >
          Odendaal M
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ marginTop: 5, color: colors.secondary }}
        >
          2nd year, BEnd Electrical
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <Button
            type={3}
            style={{
              borderColor: colors.secondary_2,
              borderWidth: 1,
              borderRadius: 100,
              paddingHorizontal: 10,
              width: "100%",
              paddingVertical: 6,
            }}
            title="Follow"
          />
        </View>
        {/* <View style={styles.container}></View> */}
      </View>
    );
  }

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
    height: width * 0.26,
    width: width * 0.26,
    borderRadius: 100,
    marginTop: 10,
    borderColor: colors.secondary,
    borderWidth: 2,
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
