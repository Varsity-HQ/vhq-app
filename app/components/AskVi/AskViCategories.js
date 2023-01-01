import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import DropDown from "../../components/Forms/DropDown";
import categories from "./askvi_categories.json";

const so_list = [...categories];

function AskViCategories({ category = "", set_category }) {
  return (
    <View style={styles.container}>
      <Text style={styles.c_title}>Question category</Text>
      <DropDown
        content={
          <View style={styles.align_between}>
            <Text style={styles.selected_text}>
              {category.replace(/-/g, " ")}
            </Text>
            <Text>
              <Ionicons name="chevron-forward" size={25} />
            </Text>
          </View>
        }
        value={category}
        setValue={(e) => set_category(e)}
        items={so_list}
        placeholder="Question category"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownWrapperStyle: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 0,
  },
  selected_text: {
    color: colors.secondary,
    textTransform: "capitalize",
  },
  c_title: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 0,
  },
  align_between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});

export default AskViCategories;

const Category = () => {
  return (
    <View>
      <Text>General question</Text>
    </View>
  );
};
