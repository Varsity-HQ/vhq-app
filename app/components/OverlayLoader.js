import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import { set_overlay_state } from "../store/actions/actions";
import { connect } from "react-redux";

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
    height: "100%",
    width: "100%",
    zIndex: 1001,
  },
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.black,
    zIndex: 1000,
    opacity: 0.6,
  },
});

export default connect(mapStateToProps, null)(OverlayLoader);
