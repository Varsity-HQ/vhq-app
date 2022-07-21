import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Image from "../Image";
import UserMenu from "./UserMenu";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";
import { color } from "react-native-reanimated";
import ItemPageHeader from "./ItemPageHeader";
import RoundedWrappedText from "../RoundedWrappedText";

const height = Dimensions.get("window").height;

{
  /* <UserMenu data={data.user_data} /> */
}

function ItemHeader({ data }) {
  return (
    <View style={styles.main_container}>
      <View style={styles.f_container}>
        <View style={styles.row_between}></View>
      </View>
      <View>
        <ItemPageHeader topPart={false} />
      </View>
      <View style={styles.lower_section}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.borderTopPricing}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {data.pricing ? "R " + data.pricing : "Free"}
            </Text>
          </View>
          <View
            style={[
              styles.priceContainer,
              {
                backgroundColor: colors.dark,
                paddingHorizontal: 15,
                borderBottomColor: colors.dark_opacity_2,
                borderBottomWidth: 1,
                borderRightWidth: 1,
                borderRightColor: colors.dark_opacity_2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 10,
              },
            ]}
          >
            <FontAwesome
              name="eye"
              style={{
                marginRight: 7,
              }}
              size={15}
              color={colors.secondary}
            />
            <Text
              style={[
                styles.price,
                {
                  color: colors.secondary,
                },
              ]}
            >
              {data.seen_by}
            </Text>
          </View>
        </View>

        <Text style={styles.heading}>About</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 2,
            borderBottomWidth: 1,
            borderBottomColor: colors.dark_opacity_2,
            paddingBottom: 13,
          }}
        >
          <RoundedWrappedText text={"Jobs"} />
          <RoundedWrappedText
            icon={
              <FontAwesome
                name="calendar-o"
                style={{
                  marginRight: 5,
                  // paddingRight: "50%",
                }}
                size={15}
                color={colors.secondary}
              />
            }
            text={dayjs(data.created_at).fromNow()}
          />
          <RoundedWrappedText
            icon={
              <FontAwesome
                name="university"
                style={{
                  marginRight: 5,
                }}
                size={15}
                color={colors.secondary}
              />
            }
            text={data.fromUniversity}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: "600",
    fontSize: RFValue(13),
    marginBottom: 10,
    marginTop: 10,
    color: colors.secondary,
  },
  main_container: {
    position: "relative",
    top: -(height * 0.005),
  },
  category_text: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: RFValue(13),
    color: colors.secondary_2,
  },
  priceContainer: {
    backgroundColor: colors.dark_opacity_2,
    borderBottomLeftRadius: 10,
    borderBottomColor: colors.dark_opacity_2,
    borderBottomWidth: 1,
    // borderBottomRightRadius: 10,
    // borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  borderTopPricing: {
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 1,
    //was working here
    marginTop: 20,
  },
  list_info: {
    color: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    fontSize: RFValue(12),
  },
  price: {
    fontSize: RFValue(16),
    fontWeight: "600",
  },
  title: {
    fontWeight: "700",
    fontSize: RFValue(16),
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
    // padding: 10,
    // backgroundColor: colors.v_st_bg_5,
    // display: "none",
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
