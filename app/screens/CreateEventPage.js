import React, { Component } from "react";
import { View, Alert, Platform } from "react-native";
import Text from "../components/AppText";
import Header from "../components/headers/header3";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { connect } from "react-redux";
import BarStepperIndicator from "../components/BarStepperIndicator";
import UserDetBar from "../components/UserDetBar";
import colors from "../config/colors";
import TB1_CreateEvent from "../components/Event/TB1_CreateEvent";
import styles from "../components/Event/styles";
import TB2_EventTarget from "../components/Event/TB2_EventTarget";
import TB3_Description from "../components/Event/TB3_Description";
import he from "he";
import TB4_CoverPhoto from "../components/Event/TB4_CoverPhoto";
import { post_new } from "../store/actions/actions";
import { HOME } from "../navigation/routes";

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    post_new: (post, attachments) => dispatch(post_new(post, attachments)),
  };
};

class CreateEventPage extends Component {
  state = {
    tabIndex: 0,
    target: {
      first: true,
      second: true,
      third: true,
      forth: true,
      postgraduates: true,
    },
    id: "",
    // Event fields
    eventName: "",
    eventVenue: "",
    eventStartDateTime: "",
    eventEndDateTime: "",
    // End of Event Fields
    posted_by: "",
    application: "",
    can_reply_privately: "true",
    postHtmlText: "",
    postText: "",
    created_at: "",
    feed_targeting: "",
    fromUniversity: this.props.core.accData.university,
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
    postType: "event_post",
    link: "",
    attachments: [],
    uploading: false,
    image_dimensions: null,
  };

  handle_proceed = (e) => {
    this.setState({
      ...this.state,
      ...e,
      tabIndex: this.state.tabIndex + 1,
    });
  };

  selectEveryone = (isChecked) => {
    let new_targets = {
      first: isChecked,
      second: isChecked,
      third: isChecked,
      forth: isChecked,
      postgraduates: isChecked,
    };
    this.setState({
      target: new_targets,
    });
  };

  handleTargetCheck = (check_state, field) => {
    let new_targets = {
      ...this.state.target,
      [field]: check_state,
    };
    this.setState({
      target: new_targets,
    });
  };

  handleEditorChange = (html) => {
    let receivedTxt = he.decode(html.replace(/<[^>]+>/g, ""));
    this.setState({
      postHtmlText: html,
      postText: receivedTxt,
    });
  };

  onImgChange = (uri) => {
    this.setState({
      attachments: [uri],
    });
  };

  pageSwitcher = () => {
    switch (this.state.tabIndex) {
      case 3:
        return (
          <TB4_CoverPhoto
            handleSubmit={this.handleSubmit}
            data={this.state}
            onImgChange={this.onImgChange}
            image={this.state.attachments[0]}
          />
        );
      case 2:
        return (
          <TB3_Description
            handleNext={() => {
              this.setState({
                tabIndex: 3,
              });
            }}
            postHtmlText={this.state.postHtmlText}
            handleEditorChange={this.handleEditorChange}
          />
        );
      case 1:
        return (
          <TB2_EventTarget
            handleTargetCheck={this.handleTargetCheck}
            selectEveryone={this.selectEveryone}
            target={this.state.target}
            handleNext={() => {
              this.setState({
                tabIndex: 2,
              });
            }}
          />
        );
      case 0:
        return (
          <TB1_CreateEvent
            data={this.state}
            handleProceed={this.handle_proceed}
          />
        );
      default:
        return (
          <TB1_CreateEvent
            data={this.state}
            handleProceed={this.handle_proceed}
          />
        );
    }
  };

  handleSubmit = () => {
    if (this.state.attachments.length === 0) {
      return Alert.alert(
        "Add picture",
        "Please upload a picture or poster to be used for this event. This will help to better decorate your event",
      );
    }

    let targets = [];
    let targetObj = this.state.target;

    Object.keys(targetObj).forEach(function (key) {
      if (key === "first" && targetObj[key] === true) {
        targets.push("1st");
      }
      if (key === "second" && targetObj[key] === true) {
        targets.push("2nd");
      }
      if (key === "third" && targetObj[key] === true) {
        targets.push("3rd");
      }
      if (key === "forth" && targetObj[key] === true) {
        targets.push("4th");
      }
      if (key === "postgraduates" && targetObj[key] === true) {
        targets.push("postgraduates");
        targets.push("masters");
        targets.push("honors");
        targets.push("phd");
      }
    });

    let local_attachments = this.state.attachments;
    this.setState({
      attachments: [],
    });

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
      eventName: this.state.eventName,
      eventStartDateTime: this.state.eventStartDateTime,
      eventEndDateTime: this.state.eventEndDateTime,
      eventVenue: this.state.eventVenue,
      feed_targeting: targets,
    };

    this.props.post_new(postObj, local_attachments);
    this.props.navigation.navigate(HOME);
  };

  handleBackPress = () => {
    if (this.state.tabIndex <= 0) return this.props.navigation.goBack();
    this.setState({
      tabIndex: this.state.tabIndex - 1,
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Screen scroll style={styles.container}>
        <Header
          style={{ borderBottomWidth: 0 }}
          backIcon={true}
          backPress={this.handleBackPress}
          title=""
          buttonText={this.state.tabIndex === 2 ? "Save & Continue" : "Cancel"}
          rightPress={() => {
            if (this.state.tabIndex === 2 && this.state.postHtmlText)
              return this.setState({
                tabIndex: 3,
              });
            if (this.state.tabIndex !== 2) navigation.goBack();
          }}
        />
        <View style={{ paddingHorizontal: 12 }}>
          <CE_header tabIndex={this.state.tabIndex} />
          <BarStepperIndicator
            step={this.state.tabIndex + 1}
            style={{ marginTop: 20, marginBottom: 7 }}
          />

          {this.pageSwitcher()}
        </View>
      </Screen>
    );
  }
}

const CE_header = ({ tabIndex }) => {
  if (tabIndex === 3) return <Text style={styles.heading}>Cover Photo</Text>;
  if (tabIndex === 2) return <Text style={styles.heading}>Description</Text>;
  if (tabIndex === 1) return <Text style={styles.heading}>Event Target</Text>;
  if (tabIndex <= 0) return <Text style={styles.heading}>Create Event</Text>;
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);
