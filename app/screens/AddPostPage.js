import React, { Component, PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Alert,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";
import Button from "../components/Button";
import { Ionicons, Foundation } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Image from "../components/Image";
import KeyboardEventListener from "../components/KeyboardEventListener";
import { HOME } from "../navigation/routes";
import { connect } from "react-redux";
import he from "he";
import { post_new } from "../store/actions/actions";
import AddImageButton from "../components/AddImageButton";
const { width: deviceWidth } = Dimensions.get("window");

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post_new: (post, attachments) => dispatch(post_new(post, attachments)),
  };
};

class AddPostPage extends Component {
  _isMounted = false;

  state = {
    keyboardHeight: 0,
    id: "",
    posted_by: "",
    application: "",
    can_reply_privately: "true",
    postHtmlText: "",
    postText: "",
    created_at: "",
    feed_targeting: "",
    fromUniversity: this.props.account.university,
    is_eligible_for_promotion: "true",
    is_promoted: "false",
    is_expired: "false",
    is_hidden: "false",
    is_popular: "false",
    shares_count: "0",
    comments_count: "0",
    reported_count: "0",
    likes_count: "0",
    saved_count: "0",
    tagged_users: [],
    postHashTags: [],
    postType: "normal_post",
    link: "",
    attachments: [],
    local_attachments: [],
    uploading: false,
    image_dimensions: null,
    pollCreate: false,
    poll_fields: [
      {
        choiceIndex: 1,
        choiceName: "",
      },
      {
        choiceIndex: 2,
        choiceName: "",
      },
    ],
  };

  componentDidMount = () => {
    this._isMounted = true;
    KeyboardEventListener.subscribe(
      ({ keyboardHeight, layoutAnimationConfig }) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        if (this._isMounted) this.setState({ keyboardHeight });
      },
    );
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleEditorChange = (html) => {
    let receivedTxt = he.decode(html.replace(/<[^>]+>/g, ""));
    let postHashTags = receivedTxt.match(/#[^\s#]*/gim);
    let tagged_users = receivedTxt.match(/@[^\s@]*/gim);
    this.setState({
      postHtmlText: html,
      postText: receivedTxt,
      postHashTags,
      tagged_users,
    });
  };

  handleImageAdd = (uri) => {
    let new_image_arr = this.state.local_attachments;
    new_image_arr.unshift(uri);
    console.log({ new_image_arr });
    this.setState({
      local_attachments: new_image_arr,
    });
  };

  removeImage = (index) => {
    let cur_images = this.state.local_attachments;
    let new_array = [];

    cur_images.forEach((x, i) => {
      if (index !== i) {
        new_array.push(x);
      }
    });

    this.setState({
      local_attachments: new_array,
    });
  };

  handleSubmit = () => {
    if (this.state.postText.length < 10)
      return Alert.alert(
        "Too short",
        "Please write more content on your post.",
        [
          {
            text: "Alright bet",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
      );
    let postObj = {
      application: Platform.OS === "ios" ? "iPhone" : "Android",
      can_reply_privately: this.state.can_reply_privately,
      postHtmlText: this.state.postHtmlText,
      postText: this.state.postText,
      is_eligible_for_promotion: "true",
      tagged_users: this.state.tagged_users,
      postHashTags: this.state.postHashTags,
      postType: this.state.postType,
      fromUniversity: this.state.fromUniversity,
      attachments: this.state.attachments,
      image_dimensions: this.state.image_dimensions,
      poll_fields: this.state.poll_fields,
    };

    this.props.post_new(postObj, this.state.local_attachments);
    this.props.navigation.navigate(HOME);
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Screen style={styles.container}>
          <ScrollView keyboardDismissMode="on-drag">
            <View>
              <Header
                buttonRightPress={this.handleSubmit}
                backPress={() => this.props.navigation.goBack()}
                buttonText="Post"
                title="Create Post"
              />
              <AddPostH2 />
            </View>
            <View
              style={{
                flex: 1,
                // zIndex: 3,
              }}
            >
              <RTextEditor handleChange={this.handleEditorChange} />
            </View>
            <View style={styles.images_container}>
              {this.state.local_attachments.map((x, index) => (
                <TouchableWithoutFeedback key={index}>
                  <View style={styles.selected_image_container}>
                    <TouchableOpacity
                      onPress={() => this.removeImage(index)}
                      style={styles.remove_button}
                    >
                      <Ionicons name="close" size={30} color={colors.primary} />
                    </TouchableOpacity>
                    <Image local uri={x} style={styles.selected_image} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>

          <View
            style={{
              bottom: this.state.keyboardHeight,
            }}
          >
            <View>
              <View>
                <ScrollView
                  horizontal
                  style={{
                    marginTop: 20,
                    paddingVertical: 10,
                    backgroundColor: "transparent",
                  }}
                >
                  <AddImageButton
                    max={4}
                    length={this.state.local_attachments.length}
                    onImgChange={this.handleImageAdd}
                    add_post
                    style={styles.obutton}
                  />
                  <TouchableOpacity style={styles.obutton}>
                    <Foundation
                      name="graph-bar"
                      color={colors.secondary}
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.obutton}>
                    <Text style={styles.eventtext}>Event</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </View>
        </Screen>
      </>
    );
  }
}

const styles = StyleSheet.create({
  remove_button: {
    position: "absolute",
    zIndex: 1,
    right: 30,
    top: 25,
    backgroundColor: colors.dark,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  selected_image_container: {
    position: "relative",
    padding: 10,
  },
  images_container: {},
  selected_image: {
    height: deviceWidth - 20,
    width: deviceWidth - 25,
    borderRadius: 10,
  },
  eventtext: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "700",
  },
  obutton: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);
