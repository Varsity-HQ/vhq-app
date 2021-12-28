import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
  findNodeHandle,
} from "react-native";
import colors from "../config/colors";
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

class RTextEditor extends Component {
  richText = React.createRef();
  scrollview = React.createRef();

  insertHTML = () => {};

  onBlur = (e) => {
    // this.richText.current.
    // console.log({ e });
    this.richText.blurContentEditor();
  };

  onInput = (e) => {
    console.log(e);
  };

  render() {
    return (
      <>
        <View style={styles.modal_container}>
          <TouchableOpacity
            onPress={() => console.log("click")}
            style={styles.moda_inner_t}
          >
            <View></View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView
            ref={this.scrollview}
            onContentSizeChange={() => this.scrollview.current.scrollToEnd()}
          >
            <RichEditor
              // initialFocus={true}
              //  editorStyle={contentStyle} // default light style
              ref={this.richText}
              // style={styles.rich}
              //   useContainer={true}
              onBlur={this.onBlur}
              initialHeight={150}
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
              onInput={this.onInput}
              //  onMessage={this.handleMessage}
              //  onFocus={that.handleFocus}
              //  onBlur={that.handleBlur}
              //  onCursorPosition={that.handleCursorPosition}
              pasteAsPlainText={true}
            />
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.richText.current.blurContentEditor()}
            style={{
              padding: 10,
            }}
          >
            <Text style={{ color: colors.dark_opacity_2 }}>
              Toggle keyboard
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  moda_inner_t: {
    backgroundColor: colors.black,
    // flex: 1,
    height: "100%",
    width: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
  modal_container: {
    backgroundColor: colors.black,
    opacity: 0.6,
    // position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  re_container: {
    borderColor: colors.secondary,
    // borderWidth: 1,

    backgroundColor: colors.dark,
  },
  container: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    maxHeight: 200,

    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    // padding: 10,
  },
});

export default RTextEditor;
