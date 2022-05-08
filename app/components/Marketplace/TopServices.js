import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import { connect } from "react-redux";
import colors from "../../config/colors";
import ItemSlider from "./ItemSlider";

const mapStateToProps = (state) => {
  return {
    university: state.core.accData.university,
  };
};

function TopServices({ university }) {
  return (
    <View style={styles.container}>
      <View style={styles.default_padding}>
        <Text style={styles.heading}>Top services</Text>
        <Text>
          Browse services offered by students or people at the {university}
        </Text>
        <View style={styles.break_header}>
          <View>
            <Text
              style={{
                fontWeight: "700",
              }}
            >
              Services
            </Text>
          </View>
          <View>
            <Text>see more</Text>
          </View>
        </View>
      </View>
      <ItemSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  default_padding: {
    paddingHorizontal: 10,
  },
  break_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: RFValue(16),
    fontWeight: "700",
    marginBottom: 7,
  },
  container: {
    paddingVertical: 10,
  },
});

export default connect(mapStateToProps, null)(TopServices);
