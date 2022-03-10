import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ShortenUniName from "../../util/universityShortName";
import TrendMenu from "./TrendMenu";
import { HASHTAG_SCREEN, ALL_TRENDING_HASHTAGS } from "../../navigation/routes";

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

function Trend({ x }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(HASHTAG_SCREEN, {
          hashtag: x.hashtag_name.replace(/#/g, ""),
        })
      }
    >
      <View style={styles.trend}>
        <View>
          <Ionicons
            color={colors.white}
            size={28}
            name="arrow-forward-outline"
          />
        </View>
        <View
          style={{
            marginLeft: 18,
            flex: 1,
          }}
        >
          <View>
            <Text style={styles.tr_t1}>
              {x.hashtag_weight > 50 ? "Trending at" : "Tagged at"}
              &nbsp;
              {ShortenUniName(x.target_university)}
            </Text>
            <Text style={styles.tr_t2}>{x.hashtag_name}</Text>
            <Text style={styles.tr_t3}>{x.hashtag_count_last48} Posts</Text>
          </View>
        </View>
        <View>
          <TrendMenu data={x} />
          {/* <Ionicons
            name="ios-ellipsis-horizontal-outline"
            color={colors.white}
            size={25}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
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
