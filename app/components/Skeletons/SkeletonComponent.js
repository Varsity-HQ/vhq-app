import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window");
import colors from "../../config/colors";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

function SkeletonComponent({ style, children, animationOff, duration = 1000 }) {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
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
      style={[{ overflow: "hidden", backgroundColor: colors.darkish2 }, style]}
    >
      <AnimatedLG
        start={[0, 0]}
        end={[1, 0]}
        style={
          animationOff
            ? {}
            : {
                ...StyleSheet.absoluteFill,
                transform: [{ translateX: translateX }],
              }
        }
        colors={[
          colors.darkish2,
          colors.darkish3,
          colors.darkish3,
          colors.darkish3,
          colors.darkish3,
          colors.darkish2,
        ]}
      />
      {children && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SkeletonComponent;
