import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Category from "../../components/Marketplace/MarketplaceCategoryIconBtn";
import { RFValue } from "react-native-responsive-fontsize";
import { ADMIN_MARKETPLACE_CATEGORY } from "../../navigation/routes";

function MarketplaceCategories({ navigation }) {
  const handle_press = (dep) => {
    navigation.navigate(ADMIN_MARKETPLACE_CATEGORY, { dep });
  };
  return (
    <Screen>
      <Header backIcon noBorder />
      <View style={[styles.wrapper, styles.first_sec]}>
        <Text style={styles.heading}>Manage Categories</Text>
        <Text style={styles.sub_text}>
          Add or delete marketplace categories for departments below. Click any
          to manage
        </Text>
      </View>
      <View style={styles.categories_container}>
        <Category
          onPress={() => handle_press("service")}
          dep="service"
          uri={require("../../assets/service.png")}
          title="Service"
        />
        <Category
          dep="listing"
          onPress={() => handle_press("listing")}
          uri={require("../../assets/deal.png")}
          title="Listing"
        />
        <Category
          dep="job-listing"
          onPress={() => handle_press("job-listing")}
          uri={require("../../assets/jobs.png")}
          title="Job"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  categories_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  wrapper: {
    padding: 10,
  },
  heading: {
    fontSize: RFValue(30),
    // fontWeight: "700",/
    fontFamily: "Lobster-Regular",
  },
  first_sec: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  sub_text: {
    textAlign: "center",
  },
});

export default MarketplaceCategories;
