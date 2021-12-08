import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

function Screen({ children, style, scroll, avoidkeyboard }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {scroll ? (
        <ScrollView style={[style, styles.view]}>{children}</ScrollView>
      ) : (
        <View style={[style, styles.view]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
