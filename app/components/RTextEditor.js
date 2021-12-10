import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { color } from "react-native-reanimated";

class RTextEditor extends Component {
  richText = React.createRef();

  insertHTML = () => {};

  render() {
    return (
      <View style={styles.container}>
        <RichEditor
          initialFocus={true}
          //  editorStyle={contentStyle} // default light style
          ref={this.richText}
          // style={styles.rich}
          useContainer={true}
          initialHeight={120}
          containerStyle={styles.re_container}
          placeholder={"Tell a story..."}
          editorStyle={{
            backgroundColor: colors.dark,
            contentCSSText: colors.white,
            color: colors.white,
            placeholderColor: colors.secondary,
            caretColor: colors.primary,
          }}
          //  initialContentHTML={initHTML}
          //  editorInitializedCallback={that.editorInitializedCallback}
          // onChange={that.handleChange}
          //  onHeightChange={that.handleHeightChange}
          //  onPaste={that.handlePaste}

          // detect hashtag and handle
          // onInput={this.onInput}
          //  onMessage={this.handleMessage}
          //  onFocus={that.handleFocus}
          //  onBlur={that.handleBlur}
          //  onCursorPosition={that.handleCursorPosition}
          pasteAsPlainText={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  re_container: {
    borderColor: colors.secondary,
    // borderWidth: 1,
    backgroundColor: colors.dark,
  },
  container: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default RTextEditor;
