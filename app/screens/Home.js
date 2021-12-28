import React, { useEffect, useState, PureComponent } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image as LocalImage,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useFonts } from "expo-font";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import TabNavigator from "../components/TabNavigator";
import PostsTab from "../components/Home/postsTab";
import { Image } from "react-native-expo-image-cache";
import universityShortName from "../util/universityShortName";
import SkeletonPost from "../components/Skeletons/Post";
import Text from "../components/AppText";
import { get_home_posts } from "../store/actions/actions";
import Header from "../components/Home/Header";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    username: state.core.accData.username,
    university: state.core.accData.university,

    loading: state.data.home_data.loading,
    posts: state.data.home_data.posts,
    error: state.data.home_data.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_posts: () => dispatch(get_home_posts()),
  };
};

class Home extends PureComponent {
  state = {
    index: 1,
  };

  componentDidMount = () => {
    this.props.get_home_posts();
  };

  setTab = (index) => {
    this.setState({
      index: index,
    });
  };

  render() {
    const { navigation, profilepic, username, university, loading, posts } =
      this.props;

    const postsSet = [...new Set(posts)];
    console.log("rendered");
    return (
      <Screen>
        <FlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          ListHeaderComponent={<Header {...this.props} />}
          data={this.props.loading ? [] : postsSet}
          renderItem={({ item }) => <PostCard data={item} />}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
