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
import colors from "../config/colors";
import uuid from "uuid";
import Screen from "../components/Screen";
import Loading from "../components/Loaders/HomeUploading";
import Header from "../components/EventInterested/Header";

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
    axios
      .get(`/poll/voters/${poll_id}`)
      .then((data) => {
        this.setState({
          voters: data.data.voters,
          lastVisible: data.data.lastVisible,
          loading: false,
          refreshing: false,
        });
      })
      .catch((err) => {
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
    // this.fetchVoters();
  };

  renderItem = ({ item }) => <View></View>;

  render() {
    return (
      <Screen style={styles.container}>
        <Header />
        {this.state.loading ? (
          <Loading
            size="large"
            style={{ alignSelf: "center", marginTop: 30 }}
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
      </Screen>
    );
  }
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
    padding: 0,
    marginTop: 10,
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PollVoters);
