import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    overlayloader: state.core.overlayloader,
  };
};

function uploadLoader({ overlayloader }) {
  //   if (!overlayloader) return null;
  return (
    <>
      <View style={styles.lottie_container}>
        <LottieView
          style={styles.lottie}
          autoPlay
          loop
          speed={2.5}
          source={require("../../assets/animations/cool_loader.json")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lottie_container: {
    // overflow: "hidden",
    height: 20,
  },
  lottie: {
    // borderColor: "red",
    // borderWidth: 1,
    height: 140,
    width: 140,
    top: -12,
  },
});

export default connect(mapStateToProps, null)(uploadLoader);
