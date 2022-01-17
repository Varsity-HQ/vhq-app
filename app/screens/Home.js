import React, { PureComponent } from "react";
import { StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { get_home_posts } from "../store/actions/actions";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Post from "../components/Skeletons/Post";
import { useScrollToTop } from "@react-navigation/native";

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

function HomeWrapper(props) {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return <Home {...props} scrollRef={ref} />;
}

class Home extends PureComponent {
  state = {
    index: 1,
    loading: false,
  };

  componentDidMount() {
    this.props.get_home_posts({
      refresh: false,
      init: true,
      more: false,
    });
  }

  onRefresh() {
    this.props.get_home_posts({
      refresh: true,
      init: false,
      more: false,
    });
  }

  handleLoadMore() {
    this.props.get_home_posts({
      refresh: true,
      init: false,
      more: true,
    });
  }

  handleListRendering = ({ item }) => (
    <PostCard navigation={this.props.navigation} data={item} />
  );

  render() {
    //|
    const { posts } = this.props;
    //|
    return (
      <Screen>
        <FlatList
          ref={this.props.scrollRef}
          ListHeaderComponent={<Header {...this.props} />}
          ListFooterComponent={
            this.props.loading
              ? () => (
                  <>
                    <Post />
                    <Post />
                    <Post />
                  </>
                )
              : () => <Footer loadingMore={this.props.loading_more} />
          }
          data={this.props.loading ? [] : posts}
          renderItem={this.handleListRendering}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          onRefresh={() => this.onRefresh()}
          refreshing={this.props.refreshing}
          onEndReached={() => this.handleLoadMore()}
          onEndReachedThreshold={0.8}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
