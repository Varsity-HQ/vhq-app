import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function JobItem({ x }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{x.title}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        {x.company && <Text style={styles.content_text}>{x.company}</Text>}
        {x.type && <Text style={styles.content_text}>Job Type : {x.type}</Text>}
        <Text style={styles.content_text}>
          Posted : {dayjs(x.created_at).fromNow()}
        </Text>
      </View>
      <View style={styles.row_between}>
        <View />
        <View style={styles.row}>
          {/* <FontAwesome size={20} color={colors.white} name="envelope-o" /> */}
          <FontAwesome
            size={20}
            style={{
              marginLeft: 10,
            }}
            color={colors.white}
            name="share-alt"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
