import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { set_poll_vote } from "../../store/actions/actions";
import colors from "../../config/colors";
import { View } from "react-native";
import Text from "../AppText";

const mapStateToProps = (state) => {
  return {
    acc_poll_votes: state.core.accData.poll_votes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    set_poll_vote: (c) => dispatch(set_poll_vote(c)),
  };
};

class PostPollSection extends Component {
  //
  state = {
    selected: null,
    total_votes: 0,
    acc_poll_votes: [],
    poll_voted: false,
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

    let total_votes = 0;
    this.props.choices.forEach((x) => {
      total_votes = total_votes + x.vote_count;
    });
    this.setState({
      total_votes,
      acc_poll_votes,
      poll_voted,
      selected: v_choice,
    });
  };

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

    this.props.choices.forEach((x) => {
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
      width = ((choice_votes / (this.state.total_votes + 1)) * 100).toString();
    }

    // console.log({ width });

    return width;
  };

  render() {
    // console.log(this.state);

    if (this.state.selected) {
      return (
        <View className="px-2 mt-2 v-poll-section">
          {this.props.choices.map((x, index) => (
            <View
              onClick={
                !this.state.poll_voted
                  ? () => this.selectPoll_choice(x.choiceIndex)
                  : null
              }
              key={index}
              className="v-poll-choice- w-100 mb-2 py-2 px-3"
            >
              <View
                style={{
                  width: `${this.calcWidth(x.choiceIndex)}%`,
                }}
                className="v-poll-selected-progress"
              ></View>
              <View className="d-flex justify-content-between">
                <View className="d-flex align-items-center">
                  <Text>{x.choiceName}&nbsp;</Text>
                  {this.state.selected === x.choiceIndex && (
                    <MaterialCommunityIcons
                      color={colors.secondary}
                      size={20}
                      name="check-circle-outline"
                    />
                  )}
                </View>
                <View>
                  <Text>{Math.round(this.calcWidth(x.choiceIndex))}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View className="px-2 mt-2 v-poll-section">
        {this.props.choices.map((x, index) => (
          <View
            onClick={() => this.selectPoll_choice(x.choiceIndex)}
            key={index}
            className="v-poll-choice text-center w-100 mb-2 p-2"
          >
            <View className="v-poll-"></View>
            <Text>{x.choiceName}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPollSection);
