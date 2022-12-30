import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Text from "../AppText";
import ReferIcon from "../../assets/refer_icon.png";
import Image from "../Image";

const height = Dimensions.get("screen").height;

function InvititionPopups(props) {
  return (
    // <View style={styles.container}>
    <View style={styles.popup_container}>
      <Image style={styles.icon} local uri={ReferIcon} />
      {/* <Text>es</Text> */}
      <View style={styles.textBelow}>
        <Text>Invite</Text>
      </View>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: "100%",
    width: "100%",
  },
  popup_container: {
    position: "absolute",
    top: height * 0.22,
    left: 0,
    // transform: "translate(-50%,-50%)",
    zIndex: 99999,
    height: 100,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "red",
  },
});

export default InvititionPopups;
