import React from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import { set_overlay_state } from "../store/actions/actions";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");

const mapStateToProps = (state) => {
  return {
    overlayloader: state.core.overlayloader,
  };
};

function OverlayLoader({ overlayloader }) {
  if (!overlayloader) return null;

  return (
    <>
      <View style={styles.lottie}>
        <LottieView
          autoPlay
          loop
          source={require("../assets/animations/overlayloader.json")}
        />
      </View>
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  lottie: {
    position: "absolute",
    height: height,
    width: width,
    zIndex: 10001,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: "absolute",
    height: height,
    width: width,
    backgroundColor: colors.black,
    zIndex: 1000,
    opacity: 0.6,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default connect(mapStateToProps, null)(OverlayLoader);
