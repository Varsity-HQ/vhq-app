import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import Input from "../Input";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
import Button from "../Button";

function HomeHeader(props) {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={colors.dark_opacity_2}
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Marketplace</Text>
        <Text>
          Find services, products or jobs offered by students around you.
        </Text>
        <Input
          style={styles.searchbox}
          type={2}
          placeholder="Search services or items"
        />
        <Button type={3} title="Search market.." />
      </View>
      {/* <LinearGradient
        style={styles.gradient}
        colors={["#1acfff", "#1c83f9"]}
        start={[0, 1]}
        end={[1, 0]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  header: {
    fontSize: RFValue(30),
    fontFamily: "Lobster-Regular",
    marginBottom: 7,
  },
  searchbox: {
    marginTop: 14,
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: colors.grayer,
  },
  container: {
    padding: 15,
    backgroundColor: colors.dark_opacity_2,
  },
});

export default HomeHeader;
