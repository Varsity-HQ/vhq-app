import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const statusBarHeight = Constants.statusBarHeight;

function Screen({
  children,
  style,
  scroll,
  avoidkeyboard,
  behavior = "position",
}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {scroll ? (
        <ScrollView style={[style, styles.view]}>
          <KeyboardAvoidingView enabled={avoidkeyboard} behavior={behavior}>
            {children}
          </KeyboardAvoidingView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
