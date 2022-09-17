import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { HASHTAG_SCREEN } from "../../navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import ShortenUniName from "../../util/universityShortName";
import colors from "../../config/colors";
import TrendMenu from "./TrendMenu";
import Text from "../AppText";

function Trend({ x, show_total }) {
  const [reported, setReported] = useState(false);
  const navigation = useNavigation();

  const onReportSubmitted = () => {
    setReported(true);
  };

  if (reported) return null;

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
            {x.hashtag_count_last48 > 0 ? (
              <Text style={styles.tr_t4}>
                {x.hashtag_count} recent post
                {x.hashtag_count_last48 > 1 ? "s" : ""}
              </Text>
            ) : (
              <Text style={styles.tr_t4}>Used {x.hashtag_count} times</Text>
            )}
          </View>
        </View>
        <View>
          <TrendMenu onReportSubmitted={onReportSubmitted} data={x} />
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
  tr_t4: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "500",
    color: colors.secondary_2,
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

export default Trend;
