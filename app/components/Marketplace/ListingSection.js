import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import { connect } from "react-redux";
import colors from "../../config/colors";
import ItemSlider from "./ItemSlider";
import { Ionicons } from "@expo/vector-icons";

function ListingSection({ name, data, t1, t2 }) {
  return (
    <View style={styles.container}>
      <View style={styles.default_padding}>
        <Text style={styles.heading}>{t1}</Text>
        <Text style={{ marginTop: 7 }}>{t2}</Text>
        <View
          style={[
            styles.break_header,
            !t2 && {
              marginTop: 0,
            },
          ]}
        >
          <View>
            <Text
              style={{
                fontWeight: "700",
                color: colors.secondary_2,
              }}
            >
              {name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: colors.secondary, marginRight: 10 }}>
              see more
            </Text>
            <Ionicons
              name="arrow-forward"
              color={colors.secondary_2}
              size={22}
            />
          </View>
        </View>
      </View>
      <ItemSlider data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  default_padding: {
    paddingHorizontal: 10,
  },
  break_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.dark_opacity_2,
    // borderBottomWidth: 2,
    paddingBottom: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: RFValue(16),
    fontWeight: "700",
  },
  container: {
    paddingVertical: 10,
  },
});

export default connect(null, null)(ListingSection);
