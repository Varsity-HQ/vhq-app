import React, { PureComponent } from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Dimensions } from "react-native";
import colors from "../../config/colors";
import RenderHtml from "react-native-render-html";
import ParsedText from "react-native-parsed-text";
import { getNativePropsForTNode } from "react-native-render-html";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { COPY_URL_IN_POST } from "../../util/toast_messages";
import { useNavigation } from "@react-navigation/native";
import { HASHTAG_SCREEN, PROFILE } from "../../navigation/routes";
import { RFValue } from "react-native-responsive-fontsize";

const CustomTextRenderer = (props) => {
  //
  const handleLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Clipboard.setString(url);
      Toast.show({
        type: "general",
        autoHide: true,
        ...COPY_URL_IN_POST,
      });
    }
  };

  const navigation = useNavigation();

  function handleUrlPress(url, matchIndex /*: number*/) {
    handleLink(url);
  }

  function handleHashtagPress(hashtag, matchIndex) {
    if (hashtag) {
      let pattern = /#(\w+)/;
      let match = hashtag.match(pattern);
      navigation.navigate(HASHTAG_SCREEN, {
        hashtag: match[1],
      });
    }
  }

  function handlePhonePress(phone, matchIndex /*: number*/) {
    AlertIOS.alert(`${phone} has been pressed!`);
  }

  function handleUsernamePress(name, matchIndex /*: number*/) {
    let pattern = /@(\w+)/;
    let match = name.match(pattern);
    navigation.push(PROFILE, {
      username: match[1],
    });
  }

  function renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /@(\w+)/;
    let match = matchingString.match(pattern);
    // return `^^${match[0]}^^`;
    return matchingString;
  }

  const nativeProps = getNativePropsForTNode(props);

  let tNodeText = nativeProps.children.props.tnode.domNode.children[0]?.data;

  return (
    <ParsedText
      style={[
        styles.text,
        {
          color: props.textColor ? props.textColor : colors.white,
          fontSize: props.fontSize ? props.fontSize : RFValue(13),
        },
      ]}
      parse={[
        { type: "url", style: styles.url, onPress: handleUrlPress },
        // { type: "phone", style: styles.phone, onPress: handlePhonePress },
        // { type: "email", style: styles.email, onPress: handleEmailPress },
        {
          pattern: /@(\w+)/,
          style: styles.username,
          onPress: handleUsernamePress,
          // renderText: renderText,
        },
        {
          pattern: /#(\w+)/,
          onPress: handleHashtagPress,
          style: styles.hashTag,
        },
      ]}
      childrenProps={{ allowFontScaling: false }}
    >
      {tNodeText}
      {/* <Text {...nativeProps} />- */}
    </ParsedText>
  );
};

//
const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: colors.white,
    // fontSize: RFValue(16),
  },
  p: {
    fontSize: 10,
  },
};
//
const { width } = Dimensions.get("window");

class Content extends PureComponent {
  render() {
    const html = this.props.html;
    const color = this.props.color;
    const fontSize = this.props.fontSize;
    return (
      <View style={styles.container}>
        {/* <Text>{html}</Text> */}
        <RenderHtml
          renderers={{
            p: (props) => (
              <CustomTextRenderer
                fontSize={fontSize ? fontSize : null}
                textColor={color ? color : null}
                {...props}
              />
            ),
            div: (props) => (
              <CustomTextRenderer
                fontSize={fontSize ? fontSize : null}
                textColor={color ? color : null}
                {...props}
              />
            ),
          }}
          // renderers={(props) => AnimatedSpanRenderer(props)}
          // baseStyle={{}}
          tagsStyles={tagsStyles}
          contentWidth={width}
          source={{
            html,
          }}
        />
        {/* </ParsedText> */}
        {/* <Text style={{ color: colors.white }}>{JSON.stringify(html)}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    // height: 120,
    paddingVertical: 10,
  },
  url: {
    color: colors.primary,
    // textDecorationLine: "underline",
  },

  email: {
    color: colors.primary,
  },

  text: {
    color: colors.white,
    fontSize: RFValue(13),
  },

  phone: {
    color: colors.primary,
  },

  name: {
    // color: "red",
  },

  username: {
    color: colors.primary,
  },

  hashTag: {
    color: colors.primary,
    // fontStyle: "italic",
  },
});

export default Content;
