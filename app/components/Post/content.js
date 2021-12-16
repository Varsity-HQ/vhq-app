import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import colors from "../../config/colors";
import RenderHtml from "react-native-render-html";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: colors.white,
  },
  a: {
    color: "green",
  },
};

function Content({ html, css = "" }) {
  const html_to_render = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${html}</body></html>`;

  console.log({ html_to_render });

  return (
    <SafeAreaView style={styles.container}>
      <RenderHtml
        baseStyle={{}}
        tagsStyles={tagsStyles}
        classesStyles={{ color: colors.secondary }}
        // contentWidth={350}
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
