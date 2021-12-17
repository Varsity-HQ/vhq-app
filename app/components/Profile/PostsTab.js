import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PostCard from "../PostCard";
import PostLoader from "../Skeletons/Post";
import { get_auth_user_posts } from "../../store/actions/actions";

import Text from "../AppText";
import AppButton from "../Button";

const mapStateToProps = (state) => {
  return {
    profile_page: state.data.profile_page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_auth_user_posts: () => dispatch(get_auth_user_posts()),
  };
};

function PostsTab({ profile_page, get_auth_user_posts }) {
  useEffect(() => {
    get_auth_user_posts();
  }, [profile_page.user.userID]);

  if (profile_page.loading_post) {
    return (
      <View>
        <PostLoader />
        <PostLoader />
      </View>
    );
  }

  const { posts } = profile_page;

  if (posts.length === 0) {
    return (
      <View style={styles.container}>
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "700" }}>No Posts</Text>
            <AppButton title="Create New" type={3} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      {posts.map((x, index) => (
        <PostCard key={index} data={x} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsTab);
