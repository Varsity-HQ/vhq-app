import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { Entypo } from "@expo/vector-icons";

function FindsMotive(props) {
  return (
    <View style={styles.container}>
      <Entypo name="chat" size={16} color={colors.white} />
      <Text style={styles.text}>Chatting</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
  container: {
    backgroundColor: colors.green,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FindsMotive;
