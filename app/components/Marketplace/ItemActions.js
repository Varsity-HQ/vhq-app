import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import AppTextInput from "../Input";
import { TyphoonLine } from "react-native-remix-icon/src/icons";

const height = Dimensions.get("window").height;

function ItemActions(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppTextInput
          width="75%"
          style={{
            flex: 1,
            borderWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderRightColor: colors.secondary_2,
            borderLeftColor: colors.secondary_2,
          }}
          type={2}
          placeholder="I'm interested.."
        />
        <Button
          style={{
            width: "20%",
            marginLeft: 10,
          }}
          type={3}
          title="Send"
        />
      </View>
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{ color: colors.secondary_2, alignSelf: "center" }}
        >
          Send a message to @chikx_12
        </Text>
      </View>
      {/* <View style={styles.bottom_icons}>
        <IconButton icon="heart" title="Like" />
        <IconButton icon="bookmark" title="Bookmark" />
        <IconButton icon="envelope" title="Message" />
        <IconButton icon="flag" title="Report" />
      </View> */}
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
          color: colors.secondary_2,
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
    justifyContent: "space-between",
  },
  container: {
    margin: 10,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    backgroundColor: colors.dark_opacity_2,
    borderRadius: 10,

    borderColor: colors.dark_opacity_2,
    padding: 15,
    paddingBottom: 5,
    paddingTop: 5,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default ItemActions;
