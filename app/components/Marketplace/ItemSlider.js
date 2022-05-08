import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ItemCard from "./ItemCard";

function ItemSlider(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 10,
        }}
        horizontal
      >
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

export default ItemSlider;
