import React from "react";
import { View, StyleSheet } from "react-native";
import HeaderC from "../headers/header3";
import Text from "../AppText";
import colors from "../../config/colors";
import { color } from "react-native-reanimated";

function Header(props) {
  return (
    <View style={styles.container}>
      <HeaderC noBorder backIcon />
      <View style={styles.container_e}>
        <Text style={styles.header}>Event Interested</Text>
        <Text style={styles.subheader}>
          Showing people interested in your event
        </Text>
      </View>
      <View style={styles.container_event}>
        <Text style={styles.subheader}>Event details</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.secondary_2,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  subheader: {
    marginTop: 10,
    color: colors.secondary,
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  container_event: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  container_e: {
    paddingHorizontal: 12,
  },
});

export default Header;
