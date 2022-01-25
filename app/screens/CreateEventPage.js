import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
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

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

class CreateEventPage extends Component {
  state = {
    tabIndex: 3,
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
    caption: null,
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
    local_attachments: [],
    local_attachments_blob: [],
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

  pageSwitcher = () => {
    switch (this.state.tabIndex) {
      case 2:
        return <TB3_Description />;
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
        return <TB1_CreateEvent handleProceed={this.handle_proceed} />;
      default:
        return <TB1_CreateEvent handleProceed={this.handle_proceed} />;
    }
  };

  handleProceed = () => {};

  handleBackPress = () => {
    if (this.state.tabIndex <= 0) return this.props.navigation.goBack();
    this.setState({
      tabIndex: this.state.tabIndex - 1,
    });
  };

  render() {
    const { navigation } = this.props;

    console.log(this.state);
    return (
      <Screen scroll style={styles.container}>
        <Header
          style={{ borderBottomWidth: 0 }}
          backIcon={true}
          backPress={this.handleBackPress}
          title=""
          buttonText="Cancel"
          rightPress={() => navigation.goBack()}
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
  if (tabIndex === 3) return <Text style={styles.heading}>Description</Text>;
  if (tabIndex === 1) return <Text style={styles.heading}>Event Target</Text>;
  if (tabIndex <= 0) return <Text style={styles.heading}>Create Event</Text>;
  return null;
};

export default connect(mapStateToProps, null)(CreateEventPage);
