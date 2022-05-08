import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function Service(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FontAwesome
          style={{
            marginBottom: 5,
          }}
          name="suitcase"
          size={25}
          color={colors.white}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Jobs
        </Text>
        <Text>for students</Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={["#1acfff", "#1c83f9"]}
        start={[0, 1]}
        end={[1, 0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    alignItems: "center",
    // top: "30%",
    paddingVertical: 30,
    zIndex: 1,
  },
  container: {
    borderColor: colors.white,
    borderWidth: 0,
    width: 170,
    height: "100%",
    borderRadius: 10,
    marginRight: 15,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default Service;
