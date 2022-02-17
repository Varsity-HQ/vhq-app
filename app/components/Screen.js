import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  // SafeAreaView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
// const statusBarHeight = Constants.statusBarHeight;

function Screen({
  children,
  style,
  scroll,
  avoidkeyboard,
  behavior = "position",
  removeInsets = false,
}) {
  const insets = useSafeAreaInsets();

  console.log({ insets });

  return (
    <View
      style={[
        styles.screen,
        style,
        {
          marginTop: insets.top,
          // marginBottom: insets.bottom
          marginBottom: removeInsets ? insets.bottom : 0,
        },
      ]}
    >
      {scroll ? (
        <ScrollView style={[style, styles.view]}>
          {avoidkeyboard && Platform.OS === "ios" ? (
            <KeyboardAvoidingView
              enabled={avoidkeyboard?.active}
              behavior={behavior}
            >
              {children}
            </KeyboardAvoidingView>
          ) : (
            <>{children}</>
          )}
        </ScrollView>
      ) : (
        <View style={[style, styles.view]}>
          {avoidkeyboard && Platform.OS === "ios" ? (
            <KeyboardAvoidingView
              enabled={avoidkeyboard?.active}
              behavior={behavior}
            >
              {children}
            </KeyboardAvoidingView>
          ) : (
            <>{children}</>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default Screen;
