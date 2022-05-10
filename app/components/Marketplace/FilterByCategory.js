import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../AppText";
import CategoryItem from "./CategoryItem";

function FilterByCategory(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.filter_text}>Filter service by category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  filter_text: {
    fontWeight: "700",
    fontSize: RFValue(15),
    marginVertical: 10,
  },
});

export default FilterByCategory;
