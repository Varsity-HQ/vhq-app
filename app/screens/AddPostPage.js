import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";
import Button from "../components/Button";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import Screen from "../components/Screen";
import AddPictureIcon from "../components/AddPost/AddPictureIcon";
import KeyboardEventListener from "../components/KeyboardEventListener";
import { HOME } from "../navigation/routes";
import { connect } from "react-redux";
import he from "he";
import { post_new } from "../store/actions/actions";

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

class AddPostPage extends PureComponent {
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
    local_attachments_blob: [],
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

    this.props.post_new(postObj, this.state.local_attachments_blob[0]);
    this.props.navigation.navigate(HOME);
  };

  render() {
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
                  }}
                >
                  <TouchableOpacity
                    onPress={() => console.log("_harmony")}
                    style={styles.obutton}
                  >
                    <AddPictureIcon
                      name="image-plus"
                      color={colors.secondary}
                      size={32}
                    />
                  </TouchableOpacity>
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
  eventtext: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "700",
  },
  obutton: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: colors.dark,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage);
