import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Text from "../AppText";
import GoldCoins from "../../assets/gold-coins.png";
import Image from "../Image";
import colors from "../../config/colors";

const width = Dimensions.get("window").width;

function RefRewardsBox({ per_ref, num }) {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          uri={GoldCoins}
          local
          style={styles.gold_image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.cost_n_per}>
        <Text style={styles.cost}>R{per_ref * num}</Text>
        <Text>per</Text>
      </View>
      <Text>{num} Referrals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cost_n_per: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cost: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.gold,
    marginRight: 3,
  },
  image_container: {
    width: "100%",
    height: 100,
  },
  gold_image: {
    width: "100%",
    height: "100%",
  },
  container: {
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 5,
    width: width / 3.3,
    marginBottom: 20,
    padding: 8,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffd70012",
  },
});

export default RefRewardsBox;
