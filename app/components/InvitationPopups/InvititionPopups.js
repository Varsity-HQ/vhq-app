import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Text from "../AppText";
import ReferIcon from "../../assets/refer_icon.png";
import Image from "../Image";
import LargePopup from "./LargePopup";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function InvititionPopups(props) {
  return (
    <>
      <LargePopup open_state={false} />
      <View style={styles.popup_container}>
        <Image style={styles.icon} local uri={ReferIcon} />
      </View>
    </>
    // <View>
    // </View>
  );
}

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "red",
    padding: 10,
  },

  icon: {
    height: "100%",
    width: "100%",
  },
  popup_container: {
    position: "absolute",
    // top: height * 0.2,
    // left: 10,
    bottom: 60 + height * 0.09,
    right: 15,
    // transform: "translate(-50%,-50%)",
    zIndex: 99999,
    height: 120,
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // backgroundColor: "red",
  },
});

export default InvititionPopups;
