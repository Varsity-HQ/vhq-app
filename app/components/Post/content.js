import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, SafeAreaView, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import colors from "../../config/colors";
import RenderHtml from "react-native-render-html";
import ParsedText from "react-native-parsed-text";
import HTML, { domNodeToHTMLString } from "react-native-render-html";

import { Animated } from "react-native";
import {
  CustomTextualRenderer,
  getNativePropsForTNode,
} from "react-native-render-html";

const AnimatedSpanRenderer = (props) => {
  function handleUrlPress(url, matchIndex /*: number*/) {
    // LinkingIOS.openURL(url);
    alert(url);
  }

  function handlePhonePress(phone, matchIndex /*: number*/) {
    AlertIOS.alert(`${phone} has been pressed!`);
  }

  function handleNamePress(name, matchIndex /*: number*/) {
    AlertIOS.alert(`Hello ${name}`);
  }

  function handleEmailPress(email, matchIndex /*: number*/) {
    AlertIOS.alert(`send email to ${email}`);
  }

  function renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  console.log({ props });
  const nativeProps = getNativePropsForTNode(props);

  let tNodeText = nativeProps.children.props.tnode.domNode.children[0]?.data;

  return (
    <ParsedText
      style={styles.text}
      parse={[
        { type: "url", style: styles.url, onPress: handleUrlPress },
        { type: "phone", style: styles.phone, onPress: handlePhonePress },
        { type: "email", style: styles.email, onPress: handleEmailPress },
        {
          pattern: /Bob|David/,
          style: styles.name,
          onPress: handleNamePress,
        },
        {
          pattern: /\[(@[^:]+):([^\]]+)\]/i,
          style: styles.username,
          onPress: handleNamePress,
          renderText: renderText,
        },
        { pattern: /42/, style: styles.magicNumber },
        { pattern: /#(\w+)/, style: styles.hashTag },
      ]}
      childrenProps={{ allowFontScaling: false }}
    >
      {tNodeText}
      {/* <Text {...nativeProps} />- */}
    </ParsedText>
  );
};

function CustomRenderer({ tnode, style, key }) {
  const html = React.useMemo(() => domNodeToHTMLString(tnode.domNode), [tnode]);
  console.log({ html });
  return <Custom key={key} html={html} style={style} />;
}
//
const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: colors.white,
    fontSize: 16,
  },
};
//
const { width } = Dimensions.get("window");

function Content({ html }) {
  return (
    <View style={styles.container}>
      {/* <Text>{html}</Text> */}
      <RenderHtml
        renderers={{
          p: (props) => <AnimatedSpanRenderer {...props} />,
        }}
        // renderers={(props) => AnimatedSpanRenderer(props)}
        // baseStyle={{}}
        tagsStyles={tagsStyles}
        contentWidth={width}
        source={{ html }}
      />
      {/* </ParsedText> */}
      {/* <Text style={{ color: colors.white }}>{JSON.stringify(html)}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    // height: 120,
  },
  url: {
    color: "red",
    textDecorationLine: "underline",
  },

  email: {
    textDecorationLine: "underline",
  },

  text: {
    color: colors.white,
    fontSize: 15,
  },

  phone: {
    color: "blue",
    textDecorationLine: "underline",
  },

  name: {
    color: "red",
  },

  username: {
    color: "green",
    fontWeight: "bold",
  },

  magicNumber: {
    fontSize: 42,
    color: "pink",
  },

  hashTag: {
    fontStyle: "italic",
  },
});

export default Content;
