import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";

function CategoryItem({ x }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
          }}
        >
          {x.categoryTitle}
        </Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={["#9e7b9b", colors.secondary_2]}
        // colors={["red", "white"]}
        start={[1, 1]}
        end={[0, 1]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    zIndex: -1,
    // opacity: 0.5,
  },
  container: {
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
    borderColor: colors.dark_opacity_2,
    borderWidth: 2,
  },
});

export default CategoryItem;
