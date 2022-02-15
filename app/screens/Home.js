import React, { PureComponent } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import Screen from "../components/Screen";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { get_home_posts, get_home_events } from "../store/actions/actions";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Post from "../components/Skeletons/Post";
import { useScrollToTop } from "@react-navigation/native";
import colors from "../config/colors";
import Loader from "../components/Loaders/Loader";
import HomeUploading from "../components/Loaders/HomeUploading";

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

    events: state.data.home_data.events,
    loading_events: state.data.home_data.loading_events,
    events_error: state.data.home_data.events_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_posts: (c) => dispatch(get_home_posts(c)),
    get_home_events: (c) => dispatch(get_home_events(c)),
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

  handlePageChange = (index) => {
    this.setState({
      index,
    });

    if (index === 2) {
      this.props.get_home_events();
    }
  };

  render() {
    //|
    const {
      //posts
      posts,
      loading,
      loading_more,

      // events
      events,
      loading_events,
      events_error,
    } = this.props;
    //|

    // console.log({ loading_events });

    return (
      <Screen>
        <FlatList
          extraData={posts}
          ref={this.props.scrollRef}
          ListHeaderComponent={
            <Header
              index={this.state.index}
              setTab={this.handlePageChange}
              {...this.props}
            />
          }
          ListFooterComponent={
            <FooterLoadings
              tab={this.state.index}
              data={
                this.state.index === 1
                  ? loading
                    ? []
                    : posts
                  : this.state.index === 2
                  ? loading_events
                    ? []
                    : events
                  : []
              }
              loading={
                this.state.index === 1
                  ? loading
                  : this.state.index === 2
                  ? loading_events
                  : loading
              }
              loading_more={
                this.state.index === 1
                  ? loading_more
                  : this.state.index === 2
                  ? false
                  : loading
              }
            />
          }
          data={
            this.state.index === 1
              ? loading
                ? []
                : posts
              : this.state.index === 2
              ? loading_events
                ? []
                : events
              : []
          }
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

const FooterLoadings = ({ loading, tab, loading_more, data = [] }) => {
  if (tab === 1 && loading) {
    return (
      <>
        <Post />
        <Post />
        <Post />
      </>
    );
  }

  if (tab === 2 && loading) {
    return (
      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <HomeUploading />
        {/* <ActivityIndicator size="large" color={colors.secondary} /> */}
      </View>
    );
  }

  //
  if (loading_more) {
    return <Footer loadingMore={true} />;
  }
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
