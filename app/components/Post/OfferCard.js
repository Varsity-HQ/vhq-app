import React from "react";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import Button from "../Button";
import Text from "../AppText";
import Image from "../Image";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import dayjs from "dayjs";
import PostPictures from "./PostPictures";

const width = Dimensions.get("window").width;

function OfferCard({ navigation, data, useWindowWidth }) {
  console.log(data.attachments[0]);
  return (
    <View
      style={[
        styles.container,
        {
          width: useWindowWidth ? width : null,
        },
      ]}
    >
      <View style={styles.top_section}>
        <PostPictures offer images={data.attachments} />
      </View>
      <View style={styles.footer_section}>
        <View>
          <View style={styles.date}>
            <Ionicons name="md-calendar" color={colors.white} size={14} />
            <Text style={styles.offer_date}>
              STARTS {dayjs(data.offerStartDateTime).format("llll")}
            </Text>
          </View>
          <Text style={styles.title}>{data.offerName}</Text>
        </View>
        <View style={styles.footer_btn}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="md-location" color={colors.secondary} size={16} />
            <Text style={{ color: colors.secondary, marginLeft: 5 }}>
              {data.offerVenue}
            </Text>
          </View>
          <View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 5,
                  }}
                  local
                  //   uri={require("../../assets/vhqcat-small.png")}
                />
                <Text style={{ fontSize: 12, color: "#4f708a" }}>
                  {/* {data.application} */}
                  VarsityHQ ~{""}
                  {Platform.OS === "ios" && " iPhone"}
                  {Platform.OS === "android" && " Android"}
                  {Platform.OS === "web" && " Web"}
                  {Platform.OS === "macos" && " Mac"}
                  {Platform.OS === "windows" && " Windows"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button
          type={3}
          content={
            <View>
              <Text style={{ fontWeight: "700" }}>
                Get Offer For 30 Credits
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    // width: 200,
  },
  offer_date: {
    marginLeft: 5,
  },
  date: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  top_section: {
    marginBottom: 10,
  },
  footer_btn: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OfferCard;
