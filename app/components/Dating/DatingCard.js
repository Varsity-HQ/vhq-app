import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import Button from "../Button";
import { Feather } from "@expo/vector-icons";
import FindsMotive from "./FindsMotive";
import FindsMatchPercentage from "./FindsMatchPercentage";
import { LinearGradient } from "expo-linear-gradient";
const width = Dimensions.get("window").width;

function DatingCard(props) {
  return (
    <View
      style={{
        padding: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={{
          uri: "https://varsityhq.imgix.net/vhq_img202145455255.jpeg",
        }}
        style={styles.container}
      >
        <View
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FindsMotive />
          </View>
        </View>
        <View>
          <View
            style={{
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FindsMatchPercentage />
            </View>
            <Text style={styles.name}>Peter</Text>
            <Text style={styles.about}>2nd Year, UJ</Text>
          </View>
          <LinearGradient
            style={styles.gradient}
            colors={[colors.dark, colors.transparent]}
            // colors={["red", "white"]}
            start={[0, 1]}
            end={[0, 0]}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    zIndex: -1,
  },
  name: {
    fontWeight: "700",
  },
  about: {
    fontSize: 13,
    fontWeight: "600",
  },
  image: {
    width: width / 2 - width * 0.05,
    height: width / 2 - width * 0.05,
    borderRadius: 10,
    // aspectRatio: 9 / 3,
  },
  container: {
    width: width / 2 - width * 0.03,
    height: width / 2 - width * 0.03,
    overflow: "hidden",
    padding: 0,
    borderRadius: 8,
  },
});

export default DatingCard;
