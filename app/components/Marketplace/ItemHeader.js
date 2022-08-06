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
import universityShortName from "../../util/universityShortName";
import ItemActions from "./ItemActions";
import RoundedIconWithLabel from "../RoundedIconWithLabel";

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
        <ItemPageHeader data={data} topPart={false} />
      </View>

      <View style={styles.lower_section}>
        <Text style={styles.price}>
          {data.pricing ? "R " + data.pricing : "Free"}
        </Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.row}>
          <RoundedIconWithLabel
            icon={
              <FontAwesome name="clock-o" size={15} color={colors.secondary} />
            }
            text={"Listed " + dayjs(data.created_at).fromNow()}
          />
          <RoundedIconWithLabel
            icon={<FontAwesome name="eye" size={15} color={colors.secondary} />}
            text={data.seen_by + " Views"}
          />
        </View>
        <View style={styles.row}>
          <RoundedIconWithLabel
            icon={
              <FontAwesome name="bookmark" size={15} color={colors.secondary} />
            }
            text={data.saved_count ? data.saved_count : "No" + " Saves"}
          />
          <RoundedIconWithLabel
            icon={
              <FontAwesome
                name="university"
                size={15}
                color={colors.secondary}
              />
            }
            text={data.fromUniversity}
          />
        </View>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 2,
            borderBottomWidth: 1,
            borderBottomColor: colors.dark_opacity_2,
            paddingBottom: 13,
          }}
        ></View>
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
  list_info: {
    color: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    fontSize: RFValue(12),
  },
  price: {
    fontSize: RFValue(22),
    fontWeight: "700",
    marginBottom: 5,
    color: colors.primary,
  },
  title: {
    fontWeight: "500",
    fontSize: RFValue(18),
    marginBottom: 15,
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
