import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";

import { useNavigation } from "@react-navigation/native";

import TrendMenu from "./TrendMenu";
import { HASHTAG_SCREEN, ALL_TRENDING_HASHTAGS } from "../../navigation/routes";
import Trend from "./Trend";
import { RFValue } from "react-native-responsive-fontsize";

function TopicTrends({ trends }) {
  const navigation = useNavigation();
  const [topicTrends, setTopicTrends] = useState([]);
  const [recentTrends, setRecentTrends] = useState([]);

  React.useEffect(() => {
    let topic_trends = [];
    let recent_trends = [];

    trends.forEach((x) => {
      if (x.hashtag_count_last48 > 0) {
        topic_trends.push(x);
      } else {
        recent_trends.push(x);
      }
    });

    setTopicTrends(topic_trends);
    setRecentTrends(recent_trends);
  }, [trends]);

  console.log({ trends });

  return (
    <View>
      {topicTrends.length > 0 && (
        <View style={[styles.container, { marginBottom: 10 }]}>
          <View>
            <Text style={[styles.header, { color: colors.secondary }]}>
              Trending
            </Text>
          </View>
          {topicTrends.map((x, index) => (
            <Trend x={x} key={index} />
          ))}
        </View>
      )}

      {recentTrends.length > 0 && (
        <View style={[styles.container]}>
          <View>
            <Text style={[styles.header, { color: colors.secondary_2 }]}>
              Past Trends
            </Text>
          </View>
          {recentTrends.map((x, index) => (
            <Trend show_total x={x} key={index} />
          ))}

          {trends.length > 0 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(ALL_TRENDING_HASHTAGS)}
              style={styles.footer}
            >
              <Text>See all trends</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                padding: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: RFValue(16),
                  marginBottom: 10,
                }}
              >
                No Trends
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: colors.secondary,
                }}
              >
                Create a new hashtag by posting with a hashtag of your choice
              </Text>
            </View>
          )}
        </View>
      )}
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
