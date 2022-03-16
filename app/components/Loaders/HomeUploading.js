import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    overlayloader: state.core.overlayloader,
  };
};

function uploadLoader({ overlayloader, size }) {
  //   if (!overlayloader) return null;
  return (
    <>
      <View style={styles.lottie_container}>
        <LottieView
          style={size === "small" ? styles.lottie_small : styles.lottie}
          autoPlay
          loop
          speed={3}
          source={require("../../assets/animations/cool_loader.json")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lottie_container: {},
  lottie: {
    height: 140,
    width: 140,
  },
  lottie_small: {
    height: 60,
    width: 60,
  },
});

export default connect(mapStateToProps, null)(uploadLoader);
