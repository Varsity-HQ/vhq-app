import React, { Component } from "react";
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
import { CREATE_EVENT, HOME } from "../navigation/routes";
import { connect } from "react-redux";
import he from "he";
import { post_new } from "../store/actions/actions";
import AddImageButton from "../components/AddImageButton";
import PollCreate from "../components/Poll/PollCreate";

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

  switchToPollPost = () => {
    let postType = this.state.postType;

    if (postType === "normal_post") {
      postType = "poll_post";
    } else {
      postType = "normal_post";
    }
    this.setState({
      local_attachments: [],
      pollCreate: !this.state.pollCreate,
      postType: postType,
    });
  };

  removePollField = (e) => {
    let poll_fields = this.state.poll_fields;
    let filtered_fields = [];

    poll_fields.forEach((x) => {
      if (x.choiceIndex !== e) {
        filtered_fields.push(x);
      }
    });

    this.setState({
      poll_fields: filtered_fields,
    });
  };

  updatePollName = (index, text) => {
    let current_poll_fields = this.state.poll_fields;
    let updated_poll_fields = [];
    current_poll_fields.forEach((x) => {
      if (x.choiceIndex === parseInt(index)) {
        let new_value = text;
        if (new_value.length <= 25) {
          updated_poll_fields.push({
            choiceIndex: parseInt(index),
            choiceName: new_value,
          });
        } else {
          updated_poll_fields.push(x);
        }
      } else {
        updated_poll_fields.push(x);
      }
    });
    this.setState({
      poll_fields: updated_poll_fields,
    });
  };

  addPollField = () => {
    let current_poll_fields = this.state.poll_fields;

    let new_Index = 0;

    this.state.poll_fields.forEach((x) => {
      if (x.choiceIndex > new_Index) {
        new_Index = x.choiceIndex;
      }
    });

    current_poll_fields.push({
      choiceIndex: new_Index + 1,
      choiceName: "",
    });
    this.setState({
      poll_fields: current_poll_fields,
    });
  };

  componentDidMount = () => {
    console.log("harmony");

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

    let _proceed = true;

    if (postObj.postType === "poll_post") {
      postObj.poll_fields.forEach((x) => {
        if (x.choiceName === "" || x.choiceName === " ") {
          _proceed = false;
          return Alert.alert(
            "Poll warning",
            "One or more poll fields have an empty name. Make sure your fields have been named before posting",
          );
        }
      });
    }

    if (_proceed) {
      this.props.post_new(postObj, this.state.local_attachments);
      this.props.navigation.navigate(HOME);
    }
  };

  render() {
    return (
      <>
        <Screen
          avoidkeyboard={{ active: this.state.pollCreate }}
          style={styles.container}
        >
          <ScrollView
            style={{
              // flex: 1,
              height: "100%",
            }}
            keyboardDismissMode="on-drag"
          >
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
              <RTextEditor
                // hasContent={this.state.pollCreate}
                pollCreate={this.state.pollCreate}
                handleChange={this.handleEditorChange}
              />
            </View>

            {this.state.pollCreate && (
              <PollCreate
                removePollField={this.removePollField}
                updatePollName={this.updatePollName}
                addPollField={this.addPollField}
                poll_fields={this.state.poll_fields}
              />
            )}

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
        </Screen>
        <View
          style={{
            marginBottom: Platform.OS === "ios" ? 20 : 0,
            bottom:
              Platform.OS === "ios"
                ? this.state.pollCreate
                  ? 0
                  : this.state.keyboardHeight
                : 0,
          }}
        >
          <View>
            <View>
              <ScrollView
                horizontal
                style={{
                  marginTop: 0,
                  paddingVertical: 10,
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={[
                    this.state.pollCreate && {
                      opacity: 0.3,
                    },
                  ]}
                >
                  <AddImageButton
                    disabled={this.state.pollCreate}
                    max={4}
                    length={this.state.local_attachments.length}
                    onImgChange={this.handleImageAdd}
                    add_post
                    style={[styles.obutton]}
                  />
                </View>

                <TouchableOpacity
                  // disabled={this.state.local_attachments.length > 0}
                  onPress={this.switchToPollPost}
                  style={[
                    styles.obutton,
                    this.state.pollCreate && {
                      backgroundColor: colors.darkish3,
                    },
                  ]}
                >
                  <Foundation
                    name="graph-bar"
                    color={colors.secondary}
                    size={22}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    this.state.pollCreate && {
                      opacity: 0.3,
                    },
                  ]}
                >
                  <TouchableOpacity
                    disabled={this.state.pollCreate}
                    style={styles.obutton}
                    onPress={() => this.props.navigation.navigate(CREATE_EVENT)}
                  >
                    <Text style={styles.eventtext}>Event</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
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
    fontWeight: "600",
  },
  obutton: {
    height: 65,
    width: 65,
    borderWidth: 1.5,
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
    borderBottomColor: colors.secondary_2,
    borderBottomWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);
