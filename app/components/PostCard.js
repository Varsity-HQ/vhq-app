import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image as ImageLocal,
  Platform,
  Dimensions,
} from "react-native";

import colors from "../config/colors";
import SkeletonPost from "./Skeletons/Post";
import dayjs from "dayjs";
import Localize from "dayjs/plugin/relativeTime";
import Content from "./Post/content";
import PostMenu from "./Post/PostMenu";
import { Image } from "react-native-expo-image-cache";
import * as routes from "../navigation/routes";
import PostCardButtons from "./Post/PostCardButtons";
import { connect } from "react-redux";
import { save_local_post } from "../store/actions/postPage";
import { save_post_user } from "../store/actions/profile";
import emojis from "../util/emojis";
import PostPictures from "./Post/PostPictures";
import PollSection from "./Post/PollSection";
import { post_vote_counter } from "../util/poll_utils";
import universityShortName from "../util/universityShortName";
import moment from "moment";
import { normalizeText } from "../util/responsivePx";
import Text from "./AppText";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import EventFooterButtons from "./Post/EventFooterButtons";
import { RFValue } from "react-native-responsive-fontsize";
import ReportedTemplate from "./ReportedTemplate";
import { check_post_reported } from "../util/postUtil";
import check_user_blocked from "../util/check_user_blocked";
import PostNotInterested from "./Skeletons/PostNotInterested";
import { not_interested_in_content } from "../store/actions/filterActions";
import { useNavigation } from "@react-navigation/native";

dayjs.extend(Localize);

const { width: deviceWidth, height, fontScale } = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    save_local_post: (post) => dispatch(save_local_post(post)),
    save_post_user: (post) => dispatch(save_post_user(post)),
    not_interested_in_content: (id) => dispatch(not_interested_in_content(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    isShowingUnfilteredPosts: state.core.accData.isShowingUnfilteredPosts,
  };
};

class PostCard extends PureComponent {
  state = {
    show_comment_bar: false,
    total_votes: 0,
    reported: false,
    blockedAcc: false,
    notInterested: false,
  };

  update_total_votes = (t_votes) => {
    this.setState({
      total_votes: t_votes,
    });
  };

  reportedToggle = () => {
    this.setState({
      reported: true,
    });
  };

  setPostNotInterested = () => {
    this.props.not_interested_in_content(this.props.data.id);
    this.setState({
      notInterested: true,
    });
  };

  componentDidMount = () => {
    {
      this.props.data?.poll_fields?.length === 0 &&
        this.setState({
          total_votes: post_vote_counter(this.props.data.poll_fields),
        });
    }
    this.setState({
      reported: check_post_reported(this.props.data.id),
      blockedAcc: check_user_blocked(this.props.data.username),
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

  handleOpenProfile = () => {
    if (this.props.data.username === "account") return;

    this.props.save_post_user(this.props.data);
    //
    this.props.navigation.push(routes.PROFILE, {
      username: this.props.data.username,
    });
  };

  render() {
    ////|

    if (this.state.blockedAcc) {
      return null;
    }

    if (this.state.reported) {
      return <ReportedTemplate type="post" />;
    }
    ////|
    const data = this.props.data;
    const hideFollowBtn = this.props.hideFollowBtn;
    if (!data) return <SkeletonPost />;

    if (this.state.notInterested) {
      return (
        <PostNotInterested
          type={data.postType === "event_post" ? "Event" : "Post"}
        />
      );
    }

    if (data.postType === "event_post") {
      return (
        // <EventPostCard/>
        <EventPost
          eventPage={this.props.eventPage}
          setPostNotInterested={() => this.setPostNotInterested()}
          handleOpenPost={this.handleOpenPost}
          handleOpenProfile={this.handleOpenProfile}
          profilepic={this.profilepic}
          data={data}
        />
      );
    }

    return (
      <View style={styles.wrapper_container}>
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
              onPress={() => {
                data.anonymous_post ? null : this.handleOpenProfile();
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {data.anonymous_post ? (
                  <ImageLocal
                    style={[styles.p_avatar]}
                    source={{ uri: emojis[data.anonymous_emoji_index] }}
                  />
                ) : (
                  <>
                    {data.profilepic ? (
                      <Image
                        style={[styles.p_avatar]}
                        uri={this.profilepic(data.profilepic)}
                        transitionDuration={300}
                      />
                    ) : (
                      <ImageLocal
                        style={[styles.p_avatar]}
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
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text style={styles.username}>
                        {data.anonymous_post ? (
                          <>anonymous - </>
                        ) : (
                          <>@{data.username} - </>
                        )}
                      </Text>
                    </View>

                    {this.props.isShowingUnfilteredPosts ? (
                      data.university ? (
                        <View
                          style={{
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: colors.secondary,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            backgroundColor: colors.dark_opacity_2,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: colors.secondary,
                              fontWeight: "700",
                            }}
                          >
                            {universityShortName(data.university)}
                          </Text>
                        </View>
                      ) : null
                    ) : (
                      <FontAwesome
                        style={styles.username}
                        name="university"
                        size={10}
                      />
                    )}

                    {/* @{data.username} -{" "} */}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ marginRight: 10 }}>
              <PostMenu
                setPostNotInterested={this.setPostNotInterested}
                onReportSubmitted={this.reportedToggle}
                data={data}
              />
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
                created_by={data.userID}
                data={data}
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
                <Text
                  style={{
                    fontSize: RFValue(11.5),
                    color: colors.secondary,
                  }}
                >
                  {this.state.total_votes} votes at{" "}
                  {universityShortName(data.university)}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(11.5),
                    color: colors.secondary,
                  }}
                >
                  &nbsp;•&nbsp;
                  {moment(data.created_at).format("LT")}
                  &nbsp;
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: RFValue(11), color: colors.secondary }}>
                {parseInt(data.likes_count) + parseInt(data.comments_count)}{" "}
                interactions&nbsp;•&nbsp;
                {dayjs(data.created_at).format("LT")}
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
                <Text style={{ fontSize: normalizeText(12), color: "#4f708a" }}>
                  {/* {data.application} */}
                  VarsityHQ ~{data.application}
                </Text>
              </View>
            </View>
          </View>

          <PostCardButtons hideFollowBtn={hideFollowBtn} data={data} />
          {/* <View
            style={{
              // flexDirection: "row",
              // alignItems: "flex-end",
              paddingTop: 5,
            }}
          >
            <Text style={styles.date_posted}>
              {dayjs(data.created_at).fromNow()}
            </Text>
          </View> */}

          {/* <PostCardFooter data={data} /> */}
        </View>
      </View>
    );
  }
}

const EventPost = ({
  data,
  profilepic,
  handleOpenPost,
  handleOpenProfile,
  setPostNotInterested,
  eventPage = false,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: eventPage ? 0 : 10,
            borderTopColor: colors.dark_2,
            borderTopWidth: 10,
          },
        ]}
      >
        <View
          style={{
            display: "none",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...styles.def_padding,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              data.anonymous_post ? null : handleOpenProfile();
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {data.anonymous_post ? (
                <ImageLocal
                  style={[styles.p_avatar]}
                  source={{ uri: emojis[data.anonymous_emoji_index] }}
                />
              ) : (
                <>
                  {data.profilepic ? (
                    <Image
                      style={[styles.p_avatar]}
                      uri={profilepic(data.profilepic)}
                      transitionDuration={300}
                    />
                  ) : (
                    <ImageLocal
                      style={[styles.p_avatar]}
                      uri={profilepic(data.profilepic)}
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

                  <FontAwesome name="university" size={12} />

                  {/* @{data.username} -{" "} */}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ marginRight: 10 }}>
            <PostMenu
              setPostNotInterested={() => setPostNotInterested()}
              data={data}
            />
          </View>
        </View>

        <View style={styles.content_container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PostPictures
              event
              eventPage={eventPage}
              images={data.attachments}
            />
          </View>
          <View style={{ padding: 10 }}>
            {eventPage ? (
              <View style={styles.row}>
                <Text style={styles.detailsText}>Event details</Text>
              </View>
            ) : null}

            <View style={styles.row}>
              <Ionicons name="md-calendar" color={colors.white} size={14} />
              <Text style={styles.event_date}>
                STARTS {dayjs(data.eventStartDateTime).format("llll")}
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.event_name}>{data.eventName}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="md-location" color={colors.white} size={16} />
              <Text style={styles.event_venue}>{data.eventVenue}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
            ...styles.def_padding,
          }}
        >
          <View style={[styles.row, { marginTop: 0 }]}>
            <MaterialIcons
              name="people"
              style={{ marginRight: 5 }}
              color={colors.secondary}
              size={16}
            />
            <Text style={{ fontSize: RFValue(13), color: colors.secondary }}>
              {parseInt(data.likes_count)} people interested
            </Text>
          </View>

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
              <Text style={{ fontSize: RFValue(11), color: "#4f708a" }}>
                {/* {data.application} */}
                VarsityHQ ~ {data.application}
              </Text>
            </View>
          </View>
        </View>

        <EventFooterButtons
          navigation={navigation}
          eventPage={eventPage}
          data={data}
        />

        {/* <PostCardFooter data={data} />  */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    marginBottom: 10,
    color: colors.secondary,
  },
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
  event_name: {
    fontSize: RFValue(20),
    fontWeight: "700",
  },
  event_venue: {
    marginLeft: 5,
    fontSize: RFValue(13),
    fontWeight: "700",
  },
  event_date: {
    marginLeft: 5,
    // color: colors.secondary,
    fontSize: RFValue(11),
  },
  def_padding: {
    paddingHorizontal: 10,
  },
  post_header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: RFValue(10),
    fontWeight: "500",
    color: colors.secondary_2,
    alignSelf: "center",
    position: "relative",
  },
  username: {
    fontSize: RFValue(14),
    color: colors.secondary,
  },
  u_name: {
    fontWeight: "700",
    fontSize: RFValue(15),
    color: colors.white,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  p_avatar: {
    borderRadius: 50,
    backgroundColor: colors.darkish3,
    // height: 45,
    // width: 45,

    height: height * 0.058,
    // height: verticalScale(40),
    // width: verticalScale(40),
    width: height * 0.058,
  },
  wrapper_container: {
    paddingVertical: 0,
    paddingTop: 10,
    paddingHorizontal: 7,
    backgroundColor: colors.dark_2,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // borderBottomColor: colors.black,
    borderBottomWidth: 0,
    backgroundColor: colors.dark,
    //
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
