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

  onInput = (e) => {};

  handleChange = (e) => {
    this.props.handleChange(e);
  };

  render() {
    const { initialInput } = this.props;
    return (
      <>
        <View
          style={[
            styles.container,
            !this.props.pollCreate
              ? {
                  maxHeight: 200,
                  minHeight: 150,
                }
              : {
                  maxHeight: 200,
                },
            this.props.stylePreset === 2 && styles.stylePreset2,
          ]}
        >
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
              // hideKeyboardAccessoryView={false}
              // initialFocus={true}

              //  editorStyle={contentStyle} // default light style
              ref={this.richText}
              // useContainer={true}
              onBlur={this.onBlur}
              // initialHeight={this.props.pollCreate ? null : 150}
              containerStyle={[styles.re_container]}
              placeholder={
                this.props.placeholder
                  ? this.props.placeholder
                  : "Tell a story..."
              }
              editorStyle={{
                backgroundColor: colors.dark,
                contentCSSText: colors.white,
                color: colors.white,
                placeholderColor: colors.secondary,
                caretColor: colors.primary,
                fontSize: 30,
                cssText: "* {font-size : 19px}",
              }}
              initialContentHTML={initialInput ? initialInput : ""}
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
  stylePreset2: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
  },
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
    borderBottomColor: colors.secondary,
    borderBottomWidth: 0,
    // padding: 10,
  },
});

export default RTextEditor;
