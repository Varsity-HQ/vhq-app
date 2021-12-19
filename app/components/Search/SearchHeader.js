import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

import RIcon from "react-native-remix-icon";

function SearchHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          placeholderTextColor={colors.secondary}
          style={styles.input}
          placeholder="Search VarsityHQ.."
        />
        <TouchableOpacity style={styles.button}>
          <RIcon name="search-2-line" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 23,
    borderLeftColor: colors.primary,
    borderLeftWidth: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: colors.white,
    flex: 1,
    padding: 10,
    borderColor: "red",
    // borderWidth: 1,
    fontSize: 16,
  },
  container: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
});

export default SearchHeader;
