import React, { PureComponent } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import colors from "../config/colors";
import Header from "../components/headers/header2";
import AddPostH2 from "../components/AddPost/AddPostH2";
import RTextEditor from "../components/RTextEditor";
import Button from "../components/Button";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import Screen from "../components/Screen";

import KeyboardEventListener from "../components/KeyboardEventListener";

import { connect } from "react-redux";
import he from "he";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

class AddPostPage extends PureComponent {
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
    KeyboardEventListener.subscribe(
      ({ keyboardHeight, layoutAnimationConfig }) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        this.setState({ keyboardHeight });
      },
    );
  };

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

  render() {
    return (
      <>
        <Screen style={styles.container}>
          <ScrollView keyboardDismissMode="on-drag">
            <View>
              <Header
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
                  <View style={styles.obutton}>
                    <MaterialCommunityIcons
                      name="image-plus"
                      color={colors.secondary}
                      size={30}
                    />
                  </View>
                  <View style={styles.obutton}>
                    <Foundation
                      name="graph-bar"
                      color={colors.secondary}
                      size={30}
                    />
                  </View>
                  <View style={styles.obutton}>
                    <Text style={styles.eventtext}>Event</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Screen>
      </>
    );
  }
}

export default connect(mapStateToProps, null)(AddPostPage);

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
