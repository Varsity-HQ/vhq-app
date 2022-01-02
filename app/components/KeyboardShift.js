import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  UIManager,
  LayoutAnimation,
} from "react-native";
import colors from "../config/colors";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default class KeyboardShift extends Component {
  constructor(props) {
    super(props);
    this.shift = new Animated.Value(0);
  }
  state = {
    marginBottom: 0,
  };

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      this.handleKeyboardDidShow,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      this.handleKeyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          //   {
          //     bottom: this.state.marginBottom,
          //   },
          //   { transform: [{ translateY: 0 - this.state.marginBottom }] },
          { transform: [{ translateY: this.shift }] },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = (event) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types.keyboard,
        LayoutAnimation.Properties.scaleXY,
      ),
    );

    Keyboard.scheduleLayoutAnimation({
      duration: event.duration,
      easing: event.easing,
    });

    Animated.timing(this.shift, {
      toValue: 0 - event.endCoordinates.height,
      duration: event.duration,
      //   easing: Easing.ease,
      useNativeDriver: true,
      //   easing: event.easing,
    }).start();
  };

  handleKeyboardDidHide = (event) => {
    Keyboard.scheduleLayoutAnimation({
      duration: event.duration,
      easing: event.easing,
    });
    Animated.timing(this.shift, {
      toValue: 0,
      //   easing: Easing.ease,
      duration: event.duration,
      useNativeDriver: true,
    }).start();
  };
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // left: 0,
    position: "absolute",
    // top: 0,
    bottom: 0,
    width: "100%",
    // backgroundColor: colors.dark,
  },
});
