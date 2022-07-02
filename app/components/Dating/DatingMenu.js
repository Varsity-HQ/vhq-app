import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Text from "../AppText";
import IconButton from "../IconButton";
import IconMenuItem from "../Settings/IconMenuItem";
import Button from "../Button";

function DatingMenu(props) {
  return (
    <View style={styles.container}>
      <Button
        type={3}
        style={{
          margin: 0,
          paddingVertical: 8,
          backgroundColor: colors.darkish,
          borderColor: colors.darkish,
          borderWidth: 1,
        }}
        content={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="location-arrow"
              style={{ paddingRight: 5 }}
              size={24}
              color={colors.secondary}
            />

            <Text
              style={{
                fontWeight: "600",
              }}
            >
              Near me
            </Text>
          </View>
        }
      />
      <Button
        type={3}
        style={{
          margin: 0,
          paddingVertical: 8,
          backgroundColor: colors.darkish,
          marginLeft: 10,
          borderColor: colors.darkish,
          borderWidth: 1,
        }}
        content={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="offline-bolt"
              size={24}
              color={colors.secondary}
              style={{ paddingRight: 5 }}
            />

            <Text
              style={{
                fontWeight: "600",
              }}
            >
              Pokes
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DatingMenu;
