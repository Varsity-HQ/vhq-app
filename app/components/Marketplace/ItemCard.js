import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";
import { check_post_reported } from "../../util/postUtil";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function ItemCard({ x, type }) {
  const navigation = useNavigation();
  const [reported, setReported] = useState(false);
  useEffect(() => {
    setReported(check_post_reported(x.id));
  }, []);
  if (reported) return null;

  if (type == 2) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.push(MARKETPLACE_ITEM_PAGE, {
            id: x.id,
          });
        }}
      >
        <View
          style={[
            styles.container,
            {
              width: width / 2,
              marginRight: 0,
              borderRadius: 0,
              borderWidth: 1,
            },
          ]}
        >
          <View>
            <Image
              uri={x.attachments[0]}
              style={[
                styles.image,

                {
                  width: width / 2,
                  height: width / 3,
                },
              ]}
            />
          </View>
          <View
            style={{
              padding: 10,
              height: height * 0.083,
            }}
          >
            <Text
              style={[
                styles.boldCapital,
                {
                  fontSize: 13,
                  marginBottom: 5,
                  fontWeight: "700",
                },
              ]}
            >
              {x.category}
            </Text>
            <Text style={{ color: colors.white }} numberOfLines={2}>
              {x.title}
            </Text>
          </View>
          <View style={styles.footer_section}>
            <View style={[styles.row]}>
              <View
                style={[
                  styles.row,
                  { paddingHorizontal: 10, paddingVertical: 3 },
                ]}
              >
                <FontAwesome name="eye" size={18} color={colors.primary} />
                <Text> {x.seen_by}</Text>
              </View>
              <LinearGradient
                style={styles.gradient}
                colors={["#9e7b9b", "#1160af"]}
                start={[1, 0]}
                end={[0, 1]}
              />
            </View>
            <View style={styles.row}>
              {x.pricing ? (
                <>
                  <Text style={styles.boldCapital}>ZAR</Text>
                  <Text> </Text>
                  <Text style={styles.price}>{x.pricing}</Text>
                </>
              ) : (
                <Text style={[styles.boldCapital, styles.price]}>FREE</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.push(MARKETPLACE_ITEM_PAGE, {
          id: x.id,
        });
      }}
    >
      <View style={styles.container}>
        <View>
          <Image uri={x.attachments[0]} style={styles.image} />
        </View>
        <View
          style={{
            padding: 10,
            height: height * 0.083,
          }}
        >
          <Text
            style={[
              styles.boldCapital,
              {
                fontSize: 13,
                marginBottom: 5,
                fontWeight: "700",
              },
            ]}
          >
            {x.category}
          </Text>
          <Text style={{ color: colors.white }} numberOfLines={2}>
            {x.title}
          </Text>
        </View>
        <View style={styles.footer_section}>
          <View style={[styles.row]}>
            <View
              style={[
                styles.row,
                { paddingHorizontal: 10, paddingVertical: 3 },
              ]}
            >
              <FontAwesome name="eye" size={18} color={colors.primary} />
              <Text> {x.seen_by}</Text>
            </View>
            <LinearGradient
              style={styles.gradient}
              colors={["#9e7b9b", "#1160af"]}
              start={[1, 0]}
              end={[0, 1]}
            />
          </View>
          <View style={styles.row}>
            {x.pricing ? (
              <>
                <Text style={styles.boldCapital}>ZAR</Text>
                <Text> </Text>
                <Text style={styles.price}>{x.pricing}</Text>
              </>
            ) : (
              <Text style={[styles.boldCapital, styles.price]}>FREE</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontWeight: "700",
    // fontSize: 20,
  },
  footer_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingRight: 10,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    borderRadius: 12,
  },
  boldCapital: {
    textTransform: "uppercase",
    color: colors.secondary,
  },
  image: {
    width: 190,
    height: 110,
  },
  container: {
    borderWidth: 2,
    borderColor: colors.dark_opacity_2,
    borderRadius: 15,
    // height: 200,
    width: 190,
    marginRight: 10,
    overflow: "hidden",
  },
});

export default ItemCard;
