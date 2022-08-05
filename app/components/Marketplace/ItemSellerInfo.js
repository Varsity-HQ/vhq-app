import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import Image from "../Image";
import dayjs from "dayjs";
import relative from "dayjs/plugin/relativeTime";
dayjs.extend(relative);

const width = Dimensions.get("window").width;

function ItemSellerInfo({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Meet the seller</Text>
        <View style={styles.row}>
          <Text style={styles.header_right}>See profile</Text>
          <FontAwesome name="chevron-right" size={14} color={colors.primary} />
        </View>
      </View>
      <View style={styles.row}>
        <Image uri={data.profilepic} style={styles.profilepic} />
        <Text style={styles.name}>
          {data.firstname} {data.surname}
        </Text>
      </View>
      <View
        style={[
          styles.row,
          {
            marginTop: 10,
          },
        ]}
      >
        <Text style={styles.small_text}>Active for </Text>
        <Text
          style={[
            styles.small_text,
            {
              color: colors.primary,
            },
          ]}
        >
          {dayjs(data.createdAt).fromNow()}
        </Text>
        <Text style={styles.small_text}> | {data.university}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  small_text: {
    fontSize: RFValue(12),
  },
  name: {
    fontWeight: "600",
    fontSize: RFValue(13),
  },
  profilepic: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 100,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  header_right: {
    fontWeight: "600",
    fontSize: RFValue(13),
    color: colors.primary,
    marginRight: 5,
  },
  header: {
    fontWeight: "700",
    fontSize: RFValue(13),
    color: colors.secondary,
  },
  container: {
    padding: 10,
    marginTop: 15,
  },
});

export default ItemSellerInfo;
