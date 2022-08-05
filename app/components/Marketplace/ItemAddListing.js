import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";

function ItemAddListing(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View>
          <Text style={styles.title}>Have something to sell ?</Text>
          <Text style={styles.title}>Add listing</Text>
        </View>
        <Button
          onPress={() => navigation.navigate()}
          type={3}
          title={"List Now"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
  },
  container: {
    padding: 10,
  },
  inner_container: {
    backgroundColor: colors.dark_opacity_2,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ItemAddListing;
