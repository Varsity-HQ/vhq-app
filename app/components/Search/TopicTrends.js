import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";

import { useNavigation } from "@react-navigation/native";

import TrendMenu from "./TrendMenu";
import { HASHTAG_SCREEN, ALL_TRENDING_HASHTAGS } from "../../navigation/routes";
import Trend from "./Trend";

function TopicTrends({ trends }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Topic Trends</Text>
      </View>
      {trends.map((x, index) => (
        <Trend x={x} key={index} />
      ))}

      <TouchableOpacity
        onPress={() => navigation.navigate(ALL_TRENDING_HASHTAGS)}
        style={styles.footer}
      >
        <Text>See all trends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.black,
    padding: 10,
    paddingVertical: 20,
  },
  tr_t1: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.secondary,
  },
  tr_t2: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  tr_t3: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.secondary,
  },
  trend: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.black,
    borderTopWidth: 1,
  },

  header: {
    fontSize: 20,
    fontWeight: "700",
    padding: 10,
  },
  container: {
    backgroundColor: colors.darkish,
  },
});

export default TopicTrends;
