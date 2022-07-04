import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Slider from "@react-native-community/slider";
import { update_distance_filter } from "../../store/actions/datingActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    distance: state.datingReducer.profile.filters.distance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_distance_filter: (i) => dispatch(update_distance_filter(i)),
  };
};

function FilterBy({ distance, update_distance_filter }) {
  const [currentDistance, Null] = React.useState(distance);
  const handleDistanceChange = (i) => {
    update_distance_filter(i);
    console.log(i);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.heading}>Distance (km)</Text>
        <Text style={styles.heading}>{distance.toFixed(2)}km</Text>
      </View>
      <Slider
        onSlidingComplete={handleDistanceChange}
        value={currentDistance}
        style={{ marginTop: 10 }}
        minimumValue={0}
        maximumValue={200}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.secondary_2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.secondary,
    fontWeight: "600",
    marginTop: 10,
  },
  container: {
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBy);
