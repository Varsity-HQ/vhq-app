import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import colors from "../../config/colors";
import { CREATE_IN_DEP } from "../../navigation/routes";
import Text from "../AppText";
import Image from "../Image";

const width = Dimensions.get("window").width;

function MarketplaceCategoryIconBtn({ title, uri, dep, disabled, onPress }) {
  const navigation = useNavigation();

  const handle_press = () => {
    if (disabled) return;

    if (onPress) return onPress();

    navigation.navigate(CREATE_IN_DEP, {
      department: dep,
    });
  };
  return (
    <View style={styles.category}>
      <TouchableOpacity onPress={handle_press} style={styles.category_inner}>
        <Image style={styles.category_icon} local uri={uri} />
        <Text
          style={{
            color: colors.secondary,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  category_icon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  category_inner: {
    backgroundColor: colors.dark_opacity_2,
    padding: 20,
    // borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    borderColor: colors.secondary_2,
    borderTopColor: colors.primary,
    borderTopWidth: 3,
    // borderWidth: 2,
  },
  category: {
    padding: 10,
    width: width / 2,
  },
});

export default MarketplaceCategoryIconBtn;
