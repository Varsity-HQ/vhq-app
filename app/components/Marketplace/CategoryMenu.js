import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Service from "./Service";
import Text from "../../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";

function CategoryMenu(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 15,
        }}
      >
        <Text style={styles.header}>Browse Services</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <Service />
        <Service />
        <Service />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: RFValue(16),
    fontWeight: "700",
  },
  container: {
    marginTop: 10,
    padding: 10,
  },
});

export default CategoryMenu;
