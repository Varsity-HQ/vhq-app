import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";
dayjs.extend(relativeTime);

function JobItem({ x }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push(MARKETPLACE_ITEM_PAGE, {
          id: x.id,
        });
      }}
      style={styles.container}
    >
      <View>
        <Text style={styles.header}>{x.title}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        {x.company ? (
          <Text
            style={[
              styles.content_text,
              {
                fontWeight: "700",
                color: colors.secondary,
              },
            ]}
          >
            {x.company}
          </Text>
        ) : null}
        {x.job_type ? (
          <Text style={styles.content_text}>
            Job Type :{" "}
            <Text
              style={{
                textTransform: "capitalize",
              }}
            >
              {x.job_type}
            </Text>
          </Text>
        ) : null}
        <Text style={[styles.content_text, { color: colors.lighish2 }]}>
          Posted : {dayjs(x.created_at).fromNow()}
        </Text>
      </View>
      <View style={styles.arrow}>
        <Ionicons
          size={30}
          style={{
            marginLeft: 10,
          }}
          color={colors.primary_opacity}
          name="ios-arrow-forward-sharp"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: "absolute",
    top: "50%",
    right: 15,
  },
  content_text: {
    fontSize: 14,
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  row_between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontWeight: "700",
  },
  container: {
    padding: 10,
    borderColor: colors.lighish,
    borderTopWidth: 1,
  },
  inner_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default JobItem;
