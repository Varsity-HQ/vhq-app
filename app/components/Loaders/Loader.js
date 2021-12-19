import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function Loader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <LottieView
          autoPlay
          loop
          speed={1.2}
          style={{
            height: 150,
            width: 150,
          }}
          source={require("../../assets/animations/loader_1.json")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: "center",
  },
  lottie: {},
});

export default Loader;
