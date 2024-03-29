import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import Text from "../AppText";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    profile: state.datingReducer.profile,
  };
};

function FindsMatchPercentage({ forceValue, data, profile }) {
  return null;
  const [percetage, setPercantage] = useState(0);

  useEffect(() => {
    if (!forceValue) {
      compute_match();
    }
  }, [data]);

  const compute_match = () => {
    if (
      data.university === profile.university &&
      data.purpose === profile.purpose &&
      data.sexual_orientation === profile.sexual_orientation
    ) {
      setPercantage(100);
      return;
    }
    if (
      data.university !== profile.university &&
      data.purpose === profile.purpose &&
      data.sexual_orientation === profile.sexual_orientation
    ) {
      setPercantage(70);
      return;
    }
    if (
      data.university !== profile.university &&
      data.purpose === profile.purpose &&
      data.sexual_orientation !== profile.sexual_orientation
    ) {
      setPercantage(40);
      return;
    }
    if (
      data.university !== profile.university &&
      data.purpose !== profile.purpose &&
      data.sexual_orientation !== profile.sexual_orientation
    ) {
      setPercantage(30);
      return;
    }

    if (data.university === profile.university) {
      setPercantage(30);
      return;
    }

    setPercantage(0);
  };

  return (
    <View style={styles.container}>
      <AnimatedProgressWheel
        size={22}
        width={5}
        progress={forceValue ? forceValue : percetage}
        color={colors.redish_2}
        backgroundColor={colors.dark_opacity}
        fullColor={colors.green}
      />
      <Text style={styles.text}>{forceValue ? forceValue : percetage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    fontSize: RFValue(12),
    fontWeight: "600",
    paddingRight: 5,
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 100,
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, null)(FindsMatchPercentage);
