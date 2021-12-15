import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import PostCard from "../PostCard";
import { connect } from "react-redux";
import { get_home_posts } from "../../store/actions/actions";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SkeletonPost from "../Skeletons/Post";

const mapStateToProps = (state) => {
  return {
    home_data: state.data.home_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_posts: () => dispatch(get_home_posts()),
  };
};

function postsTab({ home_data, get_home_posts }) {
  useEffect(() => {
    // get_home_posts();
  }, []);
  if (home_data) {
    return (
      <View>
        <SkeletonPost />
      </View>
    );
  }
  console.log(home_data);
  return (
    <View style={styles.container}>
      <PostCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(postsTab);
