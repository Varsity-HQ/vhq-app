import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Image from "../components/Image";
import Text from "./AppText";

import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

const mapStateToProps = (state) => {
  return {
    username: state.core.accData.username,
    profilepic: state.core.accData.profilepic,
    university: state.core.accData.university,
  };
};

function UserDetBar({ username, profilepic, university }) {
  return (
    <View style={styles.container}>
      <Image uri={profilepic} style={styles.profilepic} />
      <View style={styles.university_container}>
        <FontAwesome name="university" size={20} color={colors.secondary} />
        <Text>UJ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  university_container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    borderColor: colors.secondary,
  },
  profilepic: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, null)(UserDetBar);
