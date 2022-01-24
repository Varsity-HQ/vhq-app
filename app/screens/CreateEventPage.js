import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/AppText";
import Header from "../components/headers/header3";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    core: state.core,
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

  handleProceed = () => {};
  render() {
    const { navigation } = this.props;

    return (
      <Screen style={styles.container}>
        <Header
          style={{ borderBottomWidth: 0 }}
          backIcon={true}
          backPress={() => navigation.goBack()}
          title=""
          buttonText="Cancel"
          rightPress={() => navigation.goBack()}
        />
        <View style={{ padding: 12 }}>
          <Text style={styles.heading}>Create Event</Text>
          <View>
            <View></View>
            <View></View>
            <View></View>
            <View></View>
          </View>
          <Button
            style={{ marginVertical: 30 }}
            onPress={this.handleProceed}
            type={4}
            title="Next"
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "700",
  },
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, null)(CreateEventPage);
