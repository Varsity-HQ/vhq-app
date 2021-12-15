import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors";
// import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

function Post(props) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();

    //   ()
    //   .start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={{
        margin: 10,
        backgroundColor: colors.darkish2,
        borderColor: "#b0b0b0",
        height: 100,
        width: 100,
        borderRadius: 100,
        overflow: "hidden",
      }}
    >
      <AnimatedLG
        start={[0, 0]}
        end={[1, 0]}
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateX: translateX }],
        }}
        colors={[
          colors.darkish2,
          colors.darkish3,
          colors.darkish3,
          colors.darkish3,
          colors.darkish3,
          colors.darkish2,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Post;
