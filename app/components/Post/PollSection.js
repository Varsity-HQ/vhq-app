import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { set_poll_vote } from "../../store/actions/actions";
import colors from "../../config/colors";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import Text from "../AppText";

const { width } = Dimensions.get("window");

const deviceWidth = width - 25;

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
      width = (choice_votes / (this.state.total_votes + 1)) * 100;
    }

    // console.log({ width });

    return width;
  };

  render() {
    // console.log(this.state);

    if (this.state.selected) {
      return (
        <View style={styles.poll_section}>
          {this.props.choices.map((x, index) => (
            <View
              onClick={
                !this.state.poll_voted
                  ? () => this.selectPoll_choice(x.choiceIndex)
                  : null
              }
              key={index}
              style={styles.poll_choice_2}
            >
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
                    <Text style={{ fontSize: 16 }}>{x.choiceName}&nbsp;</Text>
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
        </View>
      );
    }

    return (
      <View style={styles.poll_section}>
        {this.props.choices.map((x, index) => (
          <TouchableOpacity
            onClick={() => this.selectPoll_choice(x.choiceIndex)}
            key={index}
            style={styles.poll_choice}
          >
            <Text style={styles.poll_text}>{x.choiceName}</Text>
          </TouchableOpacity>
        ))}
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
    borderLeftWidth: 5,
    borderRadius: 5,
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
    fontSize: 17,
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
