import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../components/Marketplace/CommonHeader";
import ItemGallery from "../../components/Marketplace/ItemGallery";
import ItemHeader from "../../components/Marketplace/ItemHeader";
import Screen from "../../components/Screen";
import ItemSlider from "../../components/Marketplace/ItemSlider";
import ItemActions from "../../components/Marketplace/ItemActions";
import ItemAbout from "../../components/Marketplace/ItemAbout";

function ItemPage(props) {
  return (
    <ScrollView scroll style={styles.container}>
      {/* <CommonHeader /> */}
      <ItemGallery />
      <ItemHeader />
      <ItemActions />
      <ItemAbout />
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <ItemSlider />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 50,
  },
});

export default ItemPage;
