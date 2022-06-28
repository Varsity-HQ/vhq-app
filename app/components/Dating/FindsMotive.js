import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";

function FindsMotive({ motive }) {
  if (motive === "to_have_fun") {
    return (
      <View style={styles.to_have_fun_container}>
        <FontAwesome5 name="street-view" size={15} color={colors.dark} />
        <Text
          style={[
            styles.text,
            {
              color: colors.dark,
            },
          ]}
        >
          Vibes
        </Text>
      </View>
    );
  }
  if (motive === "to_find_friends") {
    return (
      <View style={styles.to_find_friends_container}>
        <FontAwesome5 name="user-friends" size={15} color={colors.dark} />
        <Text
          style={[
            styles.text,
            {
              color: colors.dark,
            },
          ]}
        >
          Friends
        </Text>
      </View>
    );
  }
  if (motive === "to_date") {
    return (
      <View style={styles.to_date_container}>
        <FontAwesome name="heart" size={15} color={colors.white} />
        <Text
          style={[
            styles.text,
            {
              color: colors.white,
            },
          ]}
        >
          Relationship
        </Text>
      </View>
    );
  }

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
  to_have_fun_container: {
    backgroundColor: colors.v_st_bg_5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  to_find_friends_container: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  to_date_container: {
    backgroundColor: colors.v_st_bg_2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
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
