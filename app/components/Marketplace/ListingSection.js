import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import { connect } from "react-redux";
import colors from "../../config/colors";
import ItemSlider from "./ItemSlider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_CAT_PAGE } from "../../navigation/routes";

function ListingSection({ name, data, t1, t2, query }) {
  const navigation = useNavigation();

  const handle_press_see_more = () => {
    navigation.navigate(MARKETPLACE_CAT_PAGE, { category: query });
  };

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
            <TouchableOpacity onPress={handle_press_see_more}>
              <Text style={{ color: colors.secondary, marginRight: 10 }}>
                see more
              </Text>
            </TouchableOpacity>
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
