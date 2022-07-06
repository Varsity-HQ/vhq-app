import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Image from "../Image";
import UserMenu from "./UserMenu";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";

const height = Dimensions.get("window").height;

function ItemHeader({ data }) {
  return (
    <View>
      <View style={styles.f_container}>
        <View style={styles.row_between}>
          <View style={styles.row}>
            <Image
              uri={data.user_data.profilepic}
              style={styles.user_profilepic}
            />
            <View>
              <Text style={styles.name}>@{data.user_data.username}</Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                }}
              >
                member since {dayjs(data.user_data.createdAt).format("ll")}
              </Text>
            </View>
          </View>
          <View>
            <UserMenu data={data.user_data} />
          </View>
        </View>
      </View>
      <View style={styles.lower_section}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.borderTopPricing}>
          <Text style={styles.price}>
            {data.pricing ? "R " + data.pricing : "Free"}
          </Text>
        </View>

        <Text style={styles.list_info}>
          <FontAwesome
            name="calendar-o"
            style={{
              marginRight: 10,
            }}
            size={15}
            color={colors.secondary}
          />
          {" | "}
          Listed over a week ago
        </Text>
        <Text style={styles.list_info}>
          <FontAwesome
            name="university"
            style={{
              marginRight: 10,
            }}
            size={15}
            color={colors.secondary}
          />
          {" | "}
          Listed at the University of Johanessburg
        </Text>
        <Text style={styles.list_info}>
          <FontAwesome
            name="eye"
            style={{
              marginRight: 10,
            }}
            size={15}
            color={colors.secondary}
          />
          {" | "}
          Seen by 34 people
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderTopPricing: {
    borderTopColor: colors.primary,
    borderTopWidth: 1,
    //was working here
  },
  list_info: {
    marginTop: 10,
    color: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: RFValue(20),
    marginTop: 7,
    fontWeight: "600",
  },
  title: {
    fontWeight: "700",
    fontSize: RFValue(20),
  },
  lower_section: {
    padding: 10,
    marginTop: 10,
  },
  row_between: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: RFValue(14),
    marginBottom: 2,
  },
  user_profilepic: {
    height: height * 0.055,
    width: height * 0.055,
    borderRadius: 100,
    marginRight: 10,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  f_container: {
    padding: 10,
    backgroundColor: colors.darkish2,
    borderTopColor: colors.secondary_2,
    // borderTopWidth: 2,
  },
  second_sec: {
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
    padding: 10,
  },
  sub_text: {
    color: colors.secondary,
  },
  header: {
    fontWeight: "700",
    fontSize: RFValue(20),
    color: colors.white,
    // fontFamily: "Lobster-Regular",
  },
});

export default ItemHeader;
