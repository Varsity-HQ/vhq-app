import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";

function ItemCard({ x }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(MARKETPLACE_ITEM_PAGE);
      }}
    >
      <View style={styles.container}>
        <View>
          <Image uri={x.attachments[0]} style={styles.image} />
        </View>
        <View
          style={{
            padding: 10,
          }}
        >
          <Text
            style={[
              styles.boldCapital,
              {
                fontSize: 14,
                marginBottom: 5,
                fontWeight: "700",
              },
            ]}
          >
            {x.category}
          </Text>
          <Text numberOfLines={2}>{x.title}</Text>
        </View>
        <View style={styles.footer_section}>
          <View style={[styles.row]}>
            <View
              style={[styles.row, { paddingHorizontal: 5, paddingVertical: 2 }]}
            >
              <FontAwesome name="eye" size={20} color={colors.primary} />
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
    padding: 10,
    paddingVertical: 5,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  boldCapital: {
    textTransform: "uppercase",
    color: colors.secondary,
  },
  image: {
    height: 160,
    width: 160,
  },
  container: {
    borderWidth: 2,
    borderColor: colors.dark_opacity_2,
    borderRadius: 5,
    // height: 200,
    width: 160,
    marginRight: 10,
    overflow: "hidden",
  },
});

export default ItemCard;
