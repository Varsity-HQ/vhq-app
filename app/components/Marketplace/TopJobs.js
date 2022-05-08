import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import JobItem from "./JobItem";

function TopJobs(props) {
  return (
    <View style={styles.container}>
      <View style={styles.heading_section}>
        <View>
          <Text style={{ fontWeight: "700", fontSize: RFValue(15) }}>
            Browse Jobs
          </Text>
        </View>
        <View>
          <Text>see more</Text>
        </View>
      </View>
      <View>
        <JobItem />
        <JobItem />
        <JobItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading_section: {
    padding: 10,
    borderBottomColor: colors.dark_2,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
  },
});

export default TopJobs;
