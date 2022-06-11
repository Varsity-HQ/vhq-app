import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ItemCard from "./ItemCard";

function ItemSlider({ data }) {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 10,
        }}
        horizontal
      >
        {data.map((x) => (
          <ItemCard key={x.id} x={x} />
        ))}
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
