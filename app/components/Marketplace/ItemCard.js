import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function ItemCard({ props }) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          uri="https://firebasestorage.googleapis.com/v0/b/varsityhq-bd225.appspot.com/o/vhq_img202113350535.jpeg?alt=media"
          style={styles.image}
        />
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
          Gadgets
        </Text>
        <Text>Colgone for less come buy</Text>
      </View>
      <View style={styles.footer_section}>
        <View style={[styles.row]}>
          <View
            style={[styles.row, { paddingHorizontal: 5, paddingVertical: 2 }]}
          >
            <FontAwesome name="eye" size={20} color={colors.primary} />
            <Text>1</Text>
          </View>
          <LinearGradient
            style={styles.gradient}
            colors={["#9e7b9b", "#1160af"]}
            start={[1, 0]}
            end={[0, 1]}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.boldCapital}>ZAR</Text>
          <Text> </Text>
          <Text style={styles.price}>300</Text>
        </View>
      </View>
    </View>
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
