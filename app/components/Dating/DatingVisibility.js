import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import colors from "../../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../../components/AppText";
import { connect } from "react-redux";
import {
  toggle_dating_active,
  update_user_location,
} from "../../store/actions/datingActions";
import * as Location from "expo-location";

const mapStateToProps = (state) => {
  return {
    is_active: state.datingReducer.profile.is_active,
    updating_is_active: state.datingReducer.profile.updating_is_active,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle_dating_active: (s) => dispatch(toggle_dating_active(s)),
    update_user_location: (data) => dispatch(update_user_location(data)),
  };
};

function DatingVisibility({
  is_active,
  toggle_dating_active,
  updating_is_active,
  update_user_location,
}) {
  const update_location = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        update_user_location(location);
        console.log({ location });
      }
    })();
  };

  const toggleSwitch = (active) => {
    if (active) {
      update_location();
    }
    toggle_dating_active(active);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome
          name="question-circle-o"
          style={{ paddingRight: 10 }}
          size={24}
          color={colors.white}
        />
        {updating_is_active ? (
          <Text>
            {is_active ? "Activating" : "Deactivating"} profile, wait...
          </Text>
        ) : (
          <Text>{is_active ? "Deactivate" : "Activate"} profile</Text>
        )}
      </View>
      <View>
        <Switch
          disabled={updating_is_active}
          style={styles.switcher}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          ios_backgroundColor={colors.dark_opacity_2}
          onValueChange={toggleSwitch}
          value={is_active}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatingVisibility);
