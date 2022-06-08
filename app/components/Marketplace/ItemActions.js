import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import AppTextInput from "../Input";

const height = Dimensions.get("window").height;

function ItemActions(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppTextInput
          width="75%"
          style={{
            flex: 1,
          }}
          placeholder="Tell me about this service"
        />
        <Button
          style={{
            width: "20%",
            marginLeft: 10,
          }}
          type={4}
          title="Send"
        />
      </View>
      <View style={styles.bottom_icons}>
        <IconButton icon="heart" title="Like" />
        <IconButton icon="bookmark" title="Bookmark" />
        <IconButton icon="envelope" title="Message" />
        <IconButton icon="flag" title="Report" />
      </View>
    </View>
  );
}

const IconButton = ({ title, icon }) => {
  return (
    <View style={styles.btn_container}>
      <Button
        style={styles.icon_button}
        content={
          <View>
            <FontAwesome size={24} color={colors.white} name={icon} />
          </View>
        }
        type={3}
        title="button"
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: RFValue(12),
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  btn_container: {
    alignItems: "center",
  },
  icon_button: {
    borderRadius: 100,
    height: height * 0.06,
    width: height * 0.06,
  },
  bottom_icons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.darkish,
    borderWidth: 0,
    borderColor: colors.skblue,
    padding: 10,
    paddingVertical: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});

export default ItemActions;
