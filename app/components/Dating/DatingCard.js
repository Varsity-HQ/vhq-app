import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

function DatingCard(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} />
        <Button
          type={3}
          content={
            <Feather name="external-link" size={18} color={colors.secondary} />
          }
          style={{
            padding: 10,
            backgroundColor: colors.dark_2,
            borderColor: colors.secondary,
            borderWidth: 1,
            borderRadius: 100,
            //   marginLeft: 5,
            position: "absolute",
            right: 0,
            bottom: -8,
            //   height: 50,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
          }}
        >
          chikx_12
        </Text>
        <Text
          style={{
            color: colors.secondary_2,
            marginTop: 5,
          }}
        >
          Vibes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width / 2 - width * 0.05,
    height: width / 2 - width * 0.05,
    borderRadius: 10,
    // aspectRatio: 9 / 3,
  },
  container: {
    width: width / 2,
    // height: width / 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // padding: 6,
    // borderRadius: 100,
    borderColor: colors.primary,
    borderWidth: 0,
    overflow: "hidden",
  },
});

export default DatingCard;
