import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

function ItemGallery({ images }) {
  const navigation = useNavigation();
  const inserts = useSafeAreaInsets();
  return (
    <View
      style={{
        zIndex: 1,
        position: "relative",
        // padding: 10,
      }}
    >
      <Image uri={images[0]} style={styles.image} />
      <View
        style={{
          paddingTop: inserts.top,
          position: "absolute",
          paddingHorizontal: 10,
        }}
      >
        <Button
          style={styles.button}
          type={3}
          content={<FontAwesome name="close" size={20} color={colors.white} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: width * 0.11,
    width: width * 0.11,
    borderRadius: 100,
    padding: 0,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
    borderWidth: 2,
  },
  image: {
    width: width - 0,
    height: width - 0,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
});

export default ItemGallery;
