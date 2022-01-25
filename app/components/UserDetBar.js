import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Image from "../components/Image";
import Text from "./AppText";
import universityShortName from "../util/universityShortName";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { PROFILE, UPDATE_UNIVERSITY } from "../navigation/routes";

const mapStateToProps = (state) => {
  return {
    username: state.core.accData.username,
    profilepic: state.core.accData.profilepic,
    university: state.core.accData.university,
  };
};

function UserDetBar({ username, profilepic, university, style }) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(PROFILE, {
            username: username,
          })
        }
      >
        <Image uri={profilepic} style={styles.profilepic} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(UPDATE_UNIVERSITY)}
        style={styles.university_container}
      >
        <FontAwesome name="university" size={16} color={colors.secondary} />
        <Text style={styles.uni_name}>{universityShortName(university)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  uni_name: {
    fontWeight: "700",
    marginLeft: 7,
    color: colors.secondary,
  },
  university_container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 20,
    marginLeft: 10,
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
