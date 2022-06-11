import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { MARKETPLACE_CAT_PAGE } from "../../navigation/routes";

function Service({ x, skeleton }) {
  const navigation = useNavigation();

  const handleCatPress = () => {
    navigation.navigate(MARKETPLACE_CAT_PAGE);
  };
  if (skeleton) {
    return (
      <TouchableWithoutFeedback onPress={handleCatPress}>
        <View style={styles.sk_container}>
          <View style={styles.content}>
            <FontAwesome
              style={{
                marginBottom: 5,
              }}
              name="anchor"
              size={25}
              color={colors.darkish}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.darkish,
              }}
            >
              -
            </Text>
            <Text
              style={{
                color: colors.darkish,
              }}
            >
              -
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={handleCatPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <FontAwesome
            style={{
              marginBottom: 5,
            }}
            name={x.icon}
            size={25}
            color={colors.white}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {x.title}
          </Text>
          <Text>{x.subText}</Text>
        </View>
        <LinearGradient
          style={styles.gradient}
          colors={["#1acfff", "#1c83f9"]}
          start={[0, 1]}
          end={[1, 0]}
        />
      </View>
    </TouchableWithoutFeedback>
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
  sk_container: {
    backgroundColor: colors.darkish,
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
