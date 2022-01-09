/**
 * Created by andrewhurst on 10/5/15.
 */
import React, { Component } from "react";
import { Keyboard, LayoutAnimation, View } from "react-native";
import colors from "../config/colors";
import KeyboardEventListener from "../components/KeyboardEventListener";

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const animations = {
  layout: {
    spring: {
      duration: 500,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200,
      },
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

class KeyboardSpacer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      keyboardSpace: 0,
      keyboardHeight: 0,
      isKeyboardOpened: false,
    };

    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
  }

  shouldComponentUpdate(props, state) {
    if (state.isKeyboardOpened !== this.state.isKeyboardOpened)
      LayoutAnimation.configureNext(animations.layout.spring);

    return true;
  }

  //   componentWillUpdate(props, state) {

  //   }

  updateKeyboardSpace(frames) {
    if (!frames.endCoordinates) return;
    this.setState({
      keyboardSpace: frames.endCoordinates.height,
      isKeyboardOpened: true,
    });
  }

  resetKeyboardSpace() {
    this.setState({
      keyboardSpace: 0,
      isKeyboardOpened: false,
    });
  }

  componentDidMount() {
    // KeyboardEventListener.subscribe(
    //   ({ keyboardHeight, layoutAnimationConfig }) => {
    //     LayoutAnimation.configureNext(layoutAnimationConfig);
    //     this.setState({ keyboardHeight });
    //   },
    // );

    this._listeners = [
      Keyboard.addListener("keyboardDidShow", this.updateKeyboardSpace),
      Keyboard.addListener("keyboardWillHide", this.resetKeyboardSpace),
    ];
  }

  componentWillUnmount() {
    this._listeners.forEach(function (/** EmitterSubscription */ listener) {
      listener.remove();
    });
  }

  render() {
    // return this.state.keyboardSpace;
    return (
      <View
        style={[
          {
            height: this.state.keyboardSpace,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.dark,
          },
          this.props.style,
        ]}
      />
    );
  }
}

export default KeyboardSpacer;
