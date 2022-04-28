import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AccountCont from "./AccountCont";
import { v4 } from "uuid";

function SuggestedFriends({ accounts }) {
  if (accounts.length === 0) return;
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Ionicons color={colors.white} size={25} name="people" />
        <Text style={styles.header_text}>Suggested</Text>
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        {accounts.map((x) => (
          <AccountCont data={x} key={x.userID} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header_text: {
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 10,
  },
  header_container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  container: {
    backgroundColor: colors.darkish,
    marginTop: 10,
  },
});

export default SuggestedFriends;
