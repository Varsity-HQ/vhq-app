import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, SafeAreaView, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import colors from "../../config/colors";
import RenderHtml from "react-native-render-html";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: colors.white,
    fontSize: 16,
  },
};

const { width } = Dimensions.get("window");

function Content({ html }) {
  return (
    <SafeAreaView style={styles.container}>
      <RenderHtml
        // baseStyle={{}}
        tagsStyles={tagsStyles}
        contentWidth={width}
        source={{ html }}
      />
      {/* <Text style={{ color: colors.white }}>{JSON.stringify(html)}</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    // height: 120,
  },
});

export default Content;
