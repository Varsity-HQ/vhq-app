import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PostCard from "../PostCard";
import PostLoader from "../Skeletons/Post";
import { get_auth_user_posts } from "../../store/actions/actions";
import { useNavigation } from "@react-navigation/native";
import Text from "../AppText";
import AppButton from "../Button";
import { ADD_POST } from "../../navigation/routes";

const mapStateToProps = (state) => {
  return {
    profile_page: state.data.profile_page,
    auth_user_id: state.core.accData.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_auth_user_posts: () => dispatch(get_auth_user_posts()),
  };
};

function PostsTab({ profile_page, get_auth_user_posts, auth_user_id }) {
  const navigation = useNavigation();
  useEffect(() => {
    if (auth_user_id === profile_page.user.userID) {
      get_auth_user_posts();
    }
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
            {auth_user_id === profile_page.user.userID && (
              <AppButton
                onPress={() => navigation.navigate(ADD_POST)}
                title="Create New"
                type={3}
              />
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      {posts.map((x, index) => (
        <PostCard
          navigation={navigation}
          key={index}
          data={{ ...x, userID: auth_user_id }}
        />
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
