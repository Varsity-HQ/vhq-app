import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from "@expo/vector-icons";
import colors from "../../config/colors";

function Create(props) {
  return (
    <Screen>
      <Header noBorder backBtnText="Discard" />
      <View style={[styles.wrapper, styles.first_sec]}>
        <Entypo name="shop" color={colors.primary} size={40} />
        <Text style={styles.heading}>Create AD</Text>
        <Text style={styles.sub_text}>
          Select a department that relates to your ad
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  heading: {
    fontSize: RFValue(30),
    // fontWeight: "700",/
    fontFamily: "Lobster-Regular",
  },
  first_sec: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  sub_text: {
    textAlign: "center",
  },
});

export default Create;
