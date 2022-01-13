import axios from "axios";
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../config/colors";
import Text from "../AppText";
import Image from "../Image";
import uuid from "uuid";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    poll_details: state.data.poll_details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class PollVoters extends PureComponent {
  state = {
    voters: [],
    lastVisible: null,
    loading: true,
    refreshing: false,
  };

  fetchVoters = (p_id) => {
    let poll_id = this.props.poll_details.poll.id;
    console.log({ poll_id });
    axios
      .get(`/poll/voters/${poll_id}`)
      .then((data) => {
        this.setState({
          voters: data.data.voters,
          lastVisible: data.data.lastVisible,
          loading: false,
          refreshing: false,
        });
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);

        this.setState({
          refreshing: false,
        });
      });
  };

  pullToRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.fetchVoters();
  };

  componentDidMount = () => {
    this.fetchVoters();
  };

  renderItem = ({ item }) => (
    <VoteComponent
      poll_fields={this.props.poll_details.poll.poll_fields}
      data={item}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 20 }}
            color={colors.white}
          />
        ) : (
          <FlatList
            data={this.state.voters}
            keyExtractor={(item) => item.poll_id + uuid.v4()}
            renderItem={this.renderItem}
            onRefresh={() => this.pullToRefresh()}
            refreshing={this.state.refreshing}
          />
        )}
      </View>
    );
  }
}

function VoteComponent({ data, poll_fields }) {
  console.log({ poll_fields });

  const returnVotedChoice = (index) => {
    let choice = "Choice " + index;

    poll_fields.forEach((x) => {
      if (parseInt(x.choiceIndex) === parseInt(index)) {
        choice = x.choiceName;
      }
    });

    return choice;
  };

  return (
    <View style={styles.voter_section}>
      <View style={styles.voter_header}>
        <Image uri={data.profilepic} style={styles.profilepic} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontWeight: "700" }}>
            {data.firstname}&nbsp;{data.surname}
          </Text>
          <Text style={{ color: colors.secondary, marginTop: 3 }}>
            @{data.username}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.dark_2,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text>{returnVotedChoice(data.voted_choice)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voter_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilepic: {
    height: height * 0.07,
    width: height * 0.07,
    borderRadius: 100,
  },
  voter_section: {
    borderColor: colors.secondary_2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  container: {
    padding: 10,
    marginTop: 10,
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PollVoters);
