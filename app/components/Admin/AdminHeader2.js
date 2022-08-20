import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";
import { LinearGradient } from "expo-linear-gradient";

function AdminHeader2({ heading }) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.heading}>Developer Program</Text>
        <Text style={styles.subText}>
          0 people applied for the developer program
        </Text>
        <Text style={styles.subText}>
          Last submission was a few seconds ago
        </Text>
        <View style={styles.row}>
          <Button type={4} title="Edit application form" />
          <Button type={4} title="Delete all" />
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <LinearGradient
          style={styles.gradient}
          colors={["#1160af", "#9e7b9b"]}
          start={[0, 0]}
          end={[1, 0]}
        />
        <View>
          <Text>Recent Applications</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    // borderRadius: 100,
    width: "100%",
  },
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 10,
  },
  heading: {
    fontSize: RFValue(30),
    fontWeight: "700",
    marginBottom: 5,
  },
  subText: {
    fontSize: RFValue(14),
    color: colors.secondary,
  },
});

export default AdminHeader2;
