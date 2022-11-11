import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import colors from "../../config/colors";
import * as geofire from "geofire-common";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    profile: state.datingReducer.profile,
  };
};

function DistanceIndicator({ data, profile }) {
  if (!profile.lat && !profile.long) return null;
  if (!data.lat && !data.long) return null;

  const distanceInKm = geofire.distanceBetween(
    [data.lat, data.long],
    [profile.lat, profile.long],
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{distanceInKm.toFixed(2)}km </Text>
      <Text
        style={[
          styles.text2,
          {
            marginLeft: 0,
          },
        ]}
      >
        away
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text2: {
    fontSize: RFValue(12),
    fontWeight: "600",
    paddingRight: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: RFValue(12),
    fontWeight: "600",
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 100,
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, null)(DistanceIndicator);
