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
          speed={1}
          source={require("../../assets/animations/uploadingbar_2.json")}
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
    height: 90,
    width: 90,
    top: -12,
  },
});

export default connect(mapStateToProps, null)(uploadLoader);
