import React, {
  Component,
  PureComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { get_home_posts } from "../store/actions/actions";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Post from "../components/Skeletons/Post";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "uuid";
import Text from "../components/AppText";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    username: state.core.accData.username,
    university: state.core.accData.university,

    loading: state.data.home_data.loading,
    loading_more: state.data.home_data.loading_more,
    refreshing: state.data.home_data.refreshing,
    posts: state.data.home_data.posts,
    error: state.data.home_data.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_posts: (c) => dispatch(get_home_posts(c)),
  };
};

const Home = ({
  navigation,
  refreshing,
  loading,
  loading_more,
  get_home_posts,
  posts,
  ...props
}) => {
  const flatListRef = useRef();

  const [render_id, set_render] = useState(uuid.v4());

  // useEffect(() => {

  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("back home");
      get_home_posts({
        refresh: false,
        init: true,
        more: false,
      });
      set_render(uuid.v4());
    }, []),
  );

  const onRefresh = () => {
    get_home_posts({
      refresh: true,
      init: false,
      more: false,
    });
  };

  const handleLoadMore = () => {
    get_home_posts({
      refresh: true,
      init: false,
      more: true,
    });
  };
  const handleListRendering = ({ item }) => (
    <PostCard navigation={navigation} data={item} />
  );
  console.log("render");
  console.log(render_id);
  return (
    <Screen>
      <FlatList
        ref={flatListRef}
        extraData={posts}
        ListHeaderComponent={<Header navigation={navigation} {...props} />}
        ListFooterComponent={
          loading
            ? () => (
                <>
                  <Post />
                  <Post />
                  <Post />
                </>
              )
            : () => <Footer loadingMore={loading_more} />
        }
        data={loading ? [] : posts}
        renderItem={handleListRendering}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0.8}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
