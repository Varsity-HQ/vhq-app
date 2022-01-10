import React, { useEffect, useState, PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image as ImageLocal,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import SkeletonPost from "./Skeletons/Post";
import dayjs from "dayjs";
import Localize from "dayjs/plugin/relativeTime";
import Content from "./Post/content";
import PostMenu from "./Post/PostMenu";
import { Image } from "react-native-expo-image-cache";
import PostCardFooter from "../components/Post/PostCardFooter";
import * as routes from "../navigation/routes";
import PostCardButtons from "./Post/PostCardButtons";
import { connect } from "react-redux";
import { save_local_post } from "../store/actions/actions";
import emojis from "../util/emojis";
import PostPictures from "./Post/PostPictures";
import PollSection from "./Post/PollSection";
import { post_vote_counter } from "../util/poll_utils";
import universityShortName from "../util/universityShortName";
import moment from "moment";

dayjs.extend(Localize);

const { width: deviceWidth } = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    save_local_post: (post) => dispatch(save_local_post(post)),
  };
};

class PostCard extends PureComponent {
  state = {
    show_comment_bar: false,
    total_votes: 0,
  };

  update_total_votes = (t_votes) => {
    this.setState({
      total_votes: t_votes,
    });
  };

  componentDidMount = () => {
    this.setState({
      total_votes: post_vote_counter(this.props.data.poll_fields),
    });
  };

  handleOpenPost = () => {
    const data = this.props.data;
    this.props.save_local_post(data);
    this.props.navigation.push(routes.POST_PAGE, {
      post_id: data.id,
    });
  };

  profilepic = (uri) => {
    let image_uri = "";

    if (uri) {
      image_uri = this.props.data.profilepic;
    } else {
      image_uri = require("../assets/avatar.png");
    }

    return image_uri;
  };

  render() {
    const data = this.props.data;

    // console.log({ data });

    if (!data) return <SkeletonPost />;

    return (
      <>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              ...styles.def_padding,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() =>
                data.anonymous_post
                  ? null
                  : this.props.navigation.push(routes.PROFILE, {
                      username: data.username,
                    })
              }
            >
              <View style={{ flexDirection: "row" }}>
                {data.anonymous_post ? (
                  <ImageLocal
                    style={styles.p_avatar}
                    source={{ uri: emojis[data.anonymous_emoji_index] }}
                  />
                ) : (
                  <>
                    {data.profilepic ? (
                      <Image
                        style={styles.p_avatar}
                        uri={this.profilepic(data.profilepic)}
                        transitionDuration={300}
                      />
                    ) : (
                      <ImageLocal
                        style={styles.p_avatar}
                        uri={this.profilepic(data.profilepic)}
                        source={require("../assets/avatar.png")}
                      />
                    )}
                  </>
                )}

                <View style={{ marginLeft: 10 }}>
                  <View style={styles.post_header}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      lineBreakMode="tail"
                      style={styles.u_name}
                    >
                      {data.anonymous_post
                        ? data.anonymous_name
                        : data.firstname + " " + data.surname.charAt(0)}
                    </Text>
                    <Text style={styles.date_posted}>
                      {dayjs(data.created_at).fromNow()}
                    </Text>
                  </View>
                  <Text style={styles.username}>
                    {data.anonymous_post ? (
                      <>anonymous - </>
                    ) : (
                      <>@{data.username} - </>
                    )}

                    {/* @{data.username} -{" "} */}
                    <FontAwesome name="university" size={12} />
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ marginRight: 10 }}>
              <PostMenu data={data} />
            </View>
          </View>

          <View style={styles.content_container}>
            <PostPictures images={data.attachments} />

            {data.postType === "poll_post" && (
              <PollSection
                update_total_votes={this.update_total_votes}
                poll_id={data.id}
                choices={data.poll_fields}
                created={data.created_at}
              />
            )}

            <TouchableWithoutFeedback onPress={() => this.handleOpenPost()}>
              <View style={styles.def_padding}>
                <Content html={data.postHtmlText} />
              </View>
            </TouchableWithoutFeedback>

            {/* <Text
            onPress={() => nav.navigate("PostPage")}
            style={{ fontSize: 16, color: colors.light }}
          >
            {JSON.stringify(data.caption)}
          </Text> */}
          </View>
          <View
            style={{
              // marginTop: 15,
              justifyContent: "space-between",
              flexDirection: "row",
              ...styles.def_padding,
            }}
          >
            {data.postType === "poll_post" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: colors.secondary }}>
                  {this.state.total_votes} votes at{" "}
                  {universityShortName(data.university)}
                </Text>
                <Text style={{ fontSize: 14, color: colors.secondary }}>
                  &nbsp;•&nbsp;
                  {moment(data.created_at).format("LT")}
                  &nbsp;
                  {moment(data.created_at).format("L")}
                  &nbsp;
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 14, color: colors.secondary }}>
                {parseInt(data.likes_count) + parseInt(data.comments_count)}{" "}
                interactions
              </Text>
            )}

            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageLocal
                  style={{
                    height: 18,
                    width: 18,
                    marginRight: 5,
                  }}
                  source={require("../assets/vhqcat-small.png")}
                />
                <Text style={{ fontSize: 13, color: "#4f708a" }}>
                  {/* {data.application} */}
                  VarsityHQ ~{""}
                  {Platform.OS === "ios" && " iPhone"}
                  {Platform.OS === "android" && " Android"}
                  {Platform.OS === "web" && " Web"}
                  {Platform.OS === "macos" && " Mac"}
                  {Platform.OS === "windows" && " Windows"}
                </Text>
              </View>
            </View>
          </View>

          <PostCardButtons data={data} />

          {/* <PostCardFooter data={data} /> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  def_padding: {
    paddingHorizontal: 10,
  },
  post_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_text: {
    color: colors.white,
    fontSize: 16,
    paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  content_container: {
    // paddingTop: 20,
  },
  date_posted: {
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: "500",
    color: colors.secondary,
    alignSelf: "center",
    position: "relative",
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: colors.darkish3,
  },
  container: {
    // paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default connect(null, mapDispatchToProps)(PostCard);
