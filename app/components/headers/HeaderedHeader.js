import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./header3";
import Text from "../AppText";
import colors from "../../config/colors";

function HeaderedHeader({ headerText, subText }) {
  return (
    <View style={styles.container}>
      <Header showAccount noBorder backBtnText="go back" backIcon />
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{headerText}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  line: {
    height: 2,
    backgroundColor: colors.white,
    flex: 1,
    marginLeft: 10,
  },
  headerContainer: {
    paddingVertical: 30,
    borderBottomColor: colors.dark_2,
    borderTopColor: colors.black,
    // borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 6,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
  },
  subText: {
    fontSize: 15,
    marginTop: 6,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default HeaderedHeader;
