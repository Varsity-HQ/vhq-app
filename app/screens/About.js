import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Header from "../components/headers/header3";
import Image from "../components/Image";
import Screen from "../components/Screen";
import Text from "../components/AppText";
import colors from "../config/colors";

function About(props) {
  const handlePress = async () => {
    const url = "https://varsityhq.co.za";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Screen>
      <Header title="About" />
      <View style={styles.container}>
        <Image style={styles.logo} local uri={require("../assets/icon2.png")} />
        <View>
          <Text
            style={[
              styles.text,
              {
                fontWeight: "700",
              },
            ]}
          >
            VarsityHQ v2.1.3
          </Text>
          <Text style={styles.text}>
            Copyright 2021-2022 Varsity Headquarters (Pty) Ltd, all rights
            reserved
          </Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>
              For more info visit : https://varsityhq.co.za
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginVertical: 15,
    color: colors.secondary,
    fontSize: 15,
  },
  container: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default About;
