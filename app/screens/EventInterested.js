import axios from "axios";
import React, { Component } from "react";
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
import AccountCont from "../components/Search/AccountCont";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class EventInterested extends Component {
  state = {
    event: {},
    interested: [],
    lastVisible: null,
    loading: true,
    refreshing: false,
  };

  fetchInterested = () => {
    let post_id = this.props.route.params.post_id;
    console.log("get event", post_id);
    axios
      .get(`/get/event/${post_id}`)
      .then((data) => {
        // console.log(data.data);
        this.setState({
          event: data.data.event,
          interested: data.data.interested,
          lastVisible: data.data.lastVisible,
          loading: false,
          refreshing: false,
        });
      })
      .catch((err) => {
        // console.log({ err });
        this.setState({
          refreshing: false,
        });
      });
  };

  pullToRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.fetchInterested();
  };

  componentDidMount = () => {
    this.fetchInterested();
  };

  renderItem = ({ item }) => (
    <View style={{ paddingHorizontal: 10 }}>
      <AccountCont chat removeButton data={item} />
    </View>
  );

  render() {
    return (
      <Screen style={styles.container}>
        <FlatList
          data={this.state.interested}
          keyExtractor={(item) => item.userID + uuid.v4()}
          renderItem={this.renderItem}
          onRefresh={() => this.pullToRefresh()}
          refreshing={this.state.refreshing}
          ListHeaderComponent={
            <Header loading={this.state.loading} data={this.state.event} />
          }
          ListFooterComponent={
            this.state.loading ? (
              <Loading
                size="large"
                style={{ alignSelf: "center", marginTop: 30 }}
                color={colors.white}
              />
            ) : null
          }
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventInterested);
