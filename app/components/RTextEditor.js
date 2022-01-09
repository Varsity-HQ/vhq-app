import React, { Component } from "react";
import {
  View,
  StyleSheet,
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
import Text from "../components/AppText";

class RTextEditor extends Component {
  richText = React.createRef();
  scrollview = React.createRef();

  insertHTML = () => {};

  onBlur = (e) => {
    this.richText.blurContentEditor();
  };

  onInput = (e) => {
    // console.log({ input: e });
  };

  handleChange = (e) => {
    // console.log({ e });
    this.props.handleChange(e);
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <ScrollView
            ref={this.scrollview}
            onContentSizeChange={() => this.scrollview.current.scrollToEnd()}
          >
            <RichEditor
              renderLoading={
                <View>
                  <Text>loading</Text>
                </View>
              }
              // initialFocus={true}
              //  editorStyle={contentStyle} // default light style
              ref={this.richText}
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
                fontSize: 30,
                cssText: "* {font-size : 19px}",
              }}
              //  initialContentHTML={initHTML}
              //  editorInitializedCallback={that.editorInitializedCallback}
              onChange={this.handleChange}
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
    borderTopWidth: 0,
    maxHeight: 200,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 0,
    // padding: 10,
  },
});

export default RTextEditor;
