import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import CommonHeader from "../../components/Marketplace/CommonHeader";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";

function CategoryPage(props) {
  return (
    <Screen style={styles.container}>
      <CommonHeader />
      <View style={styles.subHeader_container}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 15,
          }}
        >
          MARKETPLACE
        </Text>
        <Text style={styles.header}>Services</Text>
        <Text style={styles.sub_text}>Browse and discover services.</Text>
      </View>
      <View style={styles.second_sec}>
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Found 6 services at the University of Johannesburg
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  second_sec: {
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 2,
    padding: 10,
  },
  sub_text: {
    color: colors.secondary,
  },
  header: {
    fontSize: RFValue(40),
    fontWeight: "800",
    color: colors.white,
    fontFamily: "Lobster-Regular",
  },
  subHeader_container: {
    padding: 10,
    marginTop: 10,
  },
});

export default CategoryPage;
