import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import PostCard from "../PostCard";
import { connect } from "react-redux";
import { get_home_posts } from "../../store/actions/actions";
import SkeletonPost from "../Skeletons/Post";

const mapStateToProps = (state) => {
  return {
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

function postsTab({ loading, posts, get_home_posts }) {
  useEffect(() => {
    get_home_posts();
  }, []);

  if (loading) {
    return (
      <View>
        <SkeletonPost />
        <SkeletonPost />
        <SkeletonPost />
        {/* <PostCard /> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {posts.map((x) => (
        <PostCard data={x} key={x.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(postsTab);
