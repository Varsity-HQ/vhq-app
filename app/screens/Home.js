import React, { PureComponent } from "react";
import { ActivityIndicator, View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import PostCard from "../components/PostCard";
import Text from "../components/AppText";
import { connect } from "react-redux";
import {
  get_home_posts,
  get_home_events,
  get_home_offers,
} from "../store/actions/actions";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Post from "../components/Skeletons/Post";
import { useFocusEffect, useScrollToTop } from "@react-navigation/native";
import colors from "../config/colors";
import Loader from "../components/Loaders/Loader";
import HomeUploading from "../components/Loaders/HomeUploading";
import OfferCard from "../components/Post/OfferCard";
import { RFValue } from "react-native-responsive-fontsize";
import InvititionPopups from "../components/InvitationPopups/InvititionPopups";
// import { FlashList } from "@shopify/flash-list";

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

    loading_top: state.data.home_data.loading_top,
    top_posts: state.data.home_data.top_posts,

    events: state.data.home_data.events,
    loading_events: state.data.home_data.loading_events,
    events_error: state.data.home_data.events_error,

    offers: state.data.home_data.offers,
    loading_offers: state.data.home_data.loading_offers,
    offers_error: state.data.home_data.offers_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home_posts: (c) => dispatch(get_home_posts(c)),
    get_home_events: (c) => dispatch(get_home_events(c)),
    get_home_offers: (c) => dispatch(get_home_offers(c)),
  };
};

function HomeWrapper(props) {
  useFocusEffect(
    React.useCallback(() => {
      props.get_home_posts({
        refresh: false,
        init: true,
        more: false,
        top: true,
      });
    }, []),
  );
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
      top: true,
    });
  }

  onRefresh() {
    if (this.state.index !== 1 || this.state.index !== 2) return;

    this.props.get_home_posts({
      refresh: true,
      init: false,
      more: false,
      top: this.state.index === 1 ? true : false,
    });
  }

  handleLoadMore() {
    if (this.state.index === 1 && this.props.top_posts.length < 0) return;
    if (this.state.index === 2 && this.props.posts.length < 0) return;

    this.props.get_home_posts({
      refresh: true,
      init: false,
      more: true,
      top: this.state.index === 1 ? true : false,
    });
  }

  handleListRendering = ({ item }) => {
    if (this.state.index === 1) {
      return <PostCard navigation={this.props.navigation} data={item} />;
    }
    if (this.state.index === 2) {
      return <PostCard navigation={this.props.navigation} data={item} />;
    }
    if (this.state.index === 3) {
      return <PostCard navigation={this.props.navigation} data={item} />;
    }
    if (this.state.index === 5) {
      return <OfferCard navigation={this.props.navigation} data={item} />;
    }
    return null;
  };

  handlePageChange = (index) => {
    if (index === this.state.index) return;

    this.setState({
      index,
    });

    if (index === 2) {
      this.props.get_home_posts({
        refresh: false,
        init: true,
        more: false,
        top: false,
      });
    }
    if (index === 3) {
      this.props.get_home_events();
    }

    if (index === 5) {
      this.props.get_home_offers();
    }
  };

  render() {
    //|
    const {
      //posts
      posts,
      loading,
      loading_more,

      loading_top,
      top_posts,

      // events
      events,
      loading_events,
      events_error,
      //
      offers,
      loading_offers,
      offers_error,
    } = this.props;

    return (
      <Screen>
        <InvititionPopups type="" />
        <FlatList
          removeClippedSubviews={true}
          // extraData={posts}
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
                  ? loading_top
                    ? []
                    : top_posts
                  : this.state.index === 2
                  ? loading
                    ? []
                    : posts
                  : this.state.index === 3
                  ? loading_events
                    ? []
                    : events
                  : this.state.index === 5
                  ? loading_offers
                    ? []
                    : offers
                  : []
              }
              loading={
                this.state.index === 1
                  ? loading_top
                  : this.state.index === 2
                  ? loading
                  : this.state.index === 3
                  ? loading_events
                  : this.state.index === 5
                  ? loading_offers
                  : false
              }
              loading_more={
                this.state.index === 1
                  ? loading_more
                  : this.state.index === 2
                  ? loading_more
                  : this.state.index === 3
                  ? false
                  : false
              }
            />
          }
          data={
            this.state.index === 1
              ? loading_top
                ? []
                : top_posts
              : this.state.index === 2
              ? loading
                ? []
                : posts
              : this.state.index === 3
              ? loading_events
                ? []
                : events
              : this.state.index === 5
              ? loading_offers
                ? []
                : offers
              : []
          }
          renderItem={this.handleListRendering}
          keyExtractor={(item) => item.id}
          // initialNumToRender={10}
          estimatedItemSize={344}
          onRefresh={() => this.onRefresh()}
          refreshing={this.props.refreshing}
          onEndReached={() => {
            if (this.state.index === 1 || this.state.index === 2) {
              this.handleLoadMore();
            }
          }}
          onEndReachedThreshold={0.8}
        />
      </Screen>
    );
  }
}

const FooterLoadings = ({ loading, tab, loading_more, data = [] }) => {
  if ((tab === 1 || tab === 2) && loading) {
    return (
      <>
        <Post />
        <Post />
        <Post />
      </>
    );
  }

  if (data.length === 0 && (tab === 1 || tab === 2)) {
    return (
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={[
              styles.textCenter,
              {
                fontWeight: "700",
                fontSize: RFValue(16),
              },
            ]}
          >
            No posts to show
          </Text>
          <Text
            style={[
              styles.textCenter,
              {
                paddingHorizontal: 20,
              },
            ]}
          >
            Create a post to see something here or switch content timeline to
            everything :)
          </Text>
        </View>
        {/* <ActivityIndicator size="large" color={colors.secondary} /> */}
      </View>
    );
  }

  if (tab === 3 && loading) {
    return (
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <HomeUploading />
        {/* <ActivityIndicator size="large" color={colors.secondary} /> */}
      </View>
    );
  }
  if (tab === 5 && loading) {
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
  return <View style={styles.emptySpace}></View>;
};

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center",
    marginBottom: 5,
  },
  emptySpace: {
    padding: 40,
    backgroundColor: colors.dark_2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
