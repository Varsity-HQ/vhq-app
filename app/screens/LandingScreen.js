import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import colors from "../config/colors";

function LandingScreen({ navigation }) {
  return (
    <ImageBackground
      // blurRadius={4}
      style={styles.background}
      source={require("../assets/login-img-1.jpg")}
    >
      <LinearGradient
        colors={["transparent", colors.dark]}
        style={styles.gradient}
      />
      <View style={styles.logoContainer}></View>
      <View style={styles.buttonsContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-small.png")}
        />
        <Text style={styles.heading}>Stay connected</Text>
        <Text style={styles.heading}>and make new friends</Text>
        <Text style={styles.tagline}>
          Connect with over thousands of students all over South Africa and make
          new friends and stay updated with everything happening around you.
        </Text>
        <Button
          type={2}
          onPress={() => navigation.navigate("Login")}
          title="Login"
        />
        <Button
          type={1}
          onPress={() => navigation.navigate("Register")}
          title="Register"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    color: colors.white,
    fontWeight: "700",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 120,
    overflow: "visible",
    height: 120,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 18,
    lineHeight: 25,
    // fontWeight: "600",
    color: colors.white,
    paddingVertical: 20,
  },
});

export default LandingScreen;
