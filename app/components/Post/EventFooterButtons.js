import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";
import PostMenu from "./PostMenu";
import { Ionicons } from "@expo/vector-icons";
import { check_post_liked } from "../../util/postUtil";
import { connect } from "react-redux";
import { like_post, unlike_post } from "../../store/actions/actions";
import { EVENT_INTERESTED } from "../../navigation/routes";

const { height } = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    like_post: (pid) => dispatch(like_post(pid)),
    unlike_post: (pid) => dispatch(unlike_post(pid)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth_acc_id: state.core.accData.userID,
  };
};

class EventFooterButtons extends React.PureComponent {
  state = {
    intrested: false,
  };

  handleIntrested = () => {
    const data = this.props.data;
    if (data.posted_by === this.props.auth_acc_id)
      return this.props.navigation.navigate(EVENT_INTERESTED, {
        post_id: data.id,
      });

    if (this.state.intrested) {
      this.props.unlike_post(this.props.data.id);
    } else {
      this.props.like_post(this.props.data.id);
    }

    this.setState({
      intrested: !this.state.intrested,
    });
  };

  componentDidMount = () => {
    this.setState({
      intrested: check_post_liked(this.props.data.id),
    });
  };

  render() {
    const { data, auth_acc_id } = this.props;
    return (
      <View style={[styles.row, { paddingHorizontal: 10, marginTop: 0 }]}>
        <View style={styles.width80}>
          <Button
            onPress={this.handleIntrested}
            style={[
              { height: height * 0.05, padding: 0 },
              !this.state.intrested && {
                borderWidth: 2,
                borderColor:
                  data.posted_by === auth_acc_id
                    ? colors.primary
                    : colors.secondary,
              },
            ]}
            content={
              <View style={[styles.row, { marginTop: 0 }]}>
                <Ionicons
                  name={data.posted_by === auth_acc_id ? "md-people" : "star"}
                  color={this.state.intrested ? colors.white : colors.secondary}
                  size={data.posted_by === auth_acc_id ? 18 : 16}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    marginLeft: 5,
                    color: this.state.intrested
                      ? colors.white
                      : colors.secondary,
                  }}
                >
                  {data.posted_by === auth_acc_id
                    ? "Show interested"
                    : this.state.intrested
                    ? "Interested"
                    : "Interested ?"}
                </Text>
              </View>
            }
            type={
              data.posted_by === auth_acc_id ? 3 : this.state.intrested ? 4 : 3
            }
          />
        </View>
        <View style={[styles.width20, { paddingLeft: 10 }]}>
          <PostMenu
            height={height * 0.05}
            event
            eventPage={this.props.eventPage}
            data={data}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventFooterButtons);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  width80: {
    width: "75%",
  },
  width20: {
    width: "25%",
  },
});
