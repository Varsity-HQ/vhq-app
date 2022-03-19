import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { poll_life_time_left, post_vote_counter } from "../../util/poll_utils";
import { set_poll_vote, save_poll_details } from "../../store/actions/actions";
import colors from "../../config/colors";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import { POLL_DETAILS } from "../../navigation/routes";
import { normalizeText } from "../../util/responsivePx";

const { width } = Dimensions.get("window");

const deviceWidth = width - 25;

const mapStateToProps = (state) => {
  return {
    acc_poll_votes: state.core.accData.poll_votes,
    auth_uid: state.core.accData.userID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    set_poll_vote: (c) => dispatch(set_poll_vote(c)),
    save_poll_details: (p) => dispatch(save_poll_details(p)),
  };
};

class PostPollSection extends Component {
  //
  state = {
    selected: null,
    total_votes: 0,
    acc_poll_votes: [],
    poll_voted: false,
    time_left: poll_life_time_left(this.props.created),
    timer_on: false,
  };

  componentDidMount = () => {
    let acc_poll_votes = this.props.acc_poll_votes;
    let poll_voted = false;
    let v_choice = null;

    acc_poll_votes.forEach((x) => {
      if (x.poll_id === this.props.poll_id) {
        poll_voted = true;
        v_choice = parseInt(x.voted_choice);
      }
    });

    let total_votes = post_vote_counter(this.props.choices);

    this.props.update_total_votes(total_votes);

    this.setState({
      total_votes,
      acc_poll_votes,
      poll_voted,
      selected: v_choice,
    });

    if (poll_life_time_left(this.props.created) !== "Votes closed") {
      this.intervalID = setInterval(() => this.tick(), 1000);
      this.setState({
        timer_on: true,
      });
    }
  };

  tick = () => {
    this.setState({
      time_left: poll_life_time_left(this.props.created),
    });
  };
  componentWillUnmount() {
    if (this.state.timer_on) {
      clearInterval(this.intervalID);
    }
  }

  selectPoll_choice = (c) => {
    this.setState({
      selected: c,
    });

    this.props.set_poll_vote({
      poll_id: this.props.poll_id,
      voted_choice: parseInt(c),
    });

    axios
      .get(`/poll/vote/${this.props.poll_id}/${c}`)
      .then((data) => {
        // console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  calcWidth = (index) => {
    let width = "0";
    let choice_votes = 0;

    this.props?.choices?.forEach((x) => {
      if (x.choiceIndex === index) {
        choice_votes = x.vote_count;
      }
    });

    // console.log({ choice_votes });

    if (index === this.state.selected) {
      width = (
        ((choice_votes + 1) / (this.state.total_votes + 1)) *
        100
      ).toString();
    } else {
      width = (choice_votes / (this.state.total_votes + 1)) * 100;
    }

    // console.log({ width });

    return width;
  };

  render() {
    // console.log(this.state);

    if (
      this.state.selected ||
      this.state.time_left === "Votes closed" ||
      this.props.auth_uid === this.props.created_by ||
      !this.props.created_by
    ) {
      return (
        <View style={styles.poll_section}>
          {this.props.choices.map((x, index) => (
            <View key={index} style={styles.poll_choice_2}>
              <View
                style={[
                  styles.poll_selected_progress,
                  {
                    width: (deviceWidth * this.calcWidth(x.choiceIndex)) / 100,
                  },
                ]}
              ></View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text tyle={styles.poll_text}>{x.choiceName}&nbsp;</Text>
                    {this.state.selected === x.choiceIndex && (
                      <MaterialCommunityIcons
                        color={colors.secondary}
                        size={20}
                        name="check-circle-outline"
                      />
                    )}
                  </View>
                </View>
                <View>
                  <Text>{Math.round(this.calcWidth(x.choiceIndex))}%</Text>
                </View>
              </View>
            </View>
          ))}
          <View
            style={{
              marginTop: 10,
              paddingBottom: 10,
              borderColor: colors.secondary_2,
              borderBottomWidth: 0.3,
            }}
          >
            <Text
              style={{ color: colors.secondary_2, fontSize: normalizeText(12) }}
            >
              {this.state.time_left}
            </Text>
            <View>
              {this.props.created_by === this.props.auth_uid && (
                <Button
                  onPress={() => this.props.save_poll_details(this.props.data)}
                  navigateRoute={[
                    POLL_DETAILS,
                    { poll_id: this.props.poll_id },
                  ]}
                  type={3}
                  style={{
                    marginBottom: 0,
                    backgroundColor: colors.dark_2,
                    borderColor: colors.secondary,
                  }}
                  textStyle={{ color: colors.secondary }}
                  title="See votes"
                />
              )}
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.poll_section}>
        {this.props.choices.map((x, index) => (
          <TouchableOpacity
            onPress={() => this.selectPoll_choice(x.choiceIndex)}
            key={index}
            style={styles.poll_choice}
          >
            <Text style={styles.poll_text}>{x.choiceName}</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            marginTop: 10,
            paddingBottom: 10,
            borderColor: colors.secondary_2,
            borderBottomWidth: 0.3,
          }}
        >
          <Text
            style={{ color: colors.secondary_2, fontSize: normalizeText(12) }}
          >
            {this.state.time_left}
          </Text>
          <View>
            {this.props.created_by === this.props.auth_uid && (
              <Button
                onPress={() => this.props.save_poll_details(this.props.data)}
                navigateRoute={[POLL_DETAILS, { poll_id: this.props.poll_id }]}
                type={3}
                style={{
                  marginBottom: 0,
                  backgroundColor: colors.dark_2,
                  borderColor: colors.secondary,
                }}
                textStyle={{ color: colors.secondary }}
                title="See votes"
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  poll_selected_progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: 0,
    backgroundColor: "#81c7de70",
    borderLeftColor: "#81c7de70",
    borderLeftWidth: 6,
    borderRadius: 7,
  },
  poll_choice_2: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
    position: "relative",
    flexDirection: "row",
    width: "100%",

    alignItems: "center",
  },
  poll_text: {
    fontWeight: "600",
    alignSelf: "center",
    fontSize: normalizeText(15),
  },
  poll_choice: {
    borderColor: colors.secondary_2,
    borderWidth: 1,
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#24435a",
  },
  poll_section: {
    paddingHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPollSection);
