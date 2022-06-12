import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import Header from "../../components/Dating/Header";
import DatingCard from "../../components/Dating/DatingCard";
import * as geofire from "geofire-common";

const tabs = [
  {
    title: "Explore",
    index: 1,
    icon: "https://img.icons8.com/plumpy/344/red-yellow-cards.png",
    icon_a:
      "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMDcuNSwzMi4yNXY4NmMwLDkuODk3MTcgLTguMDE5NSwxNy45MTY2NyAtMTcuOTE2NjcsMTcuOTE2NjdoLTUwLjE2NjY3Yy05Ljg5NzE3LDAgLTE3LjkxNjY3LC04LjAxOTUgLTE3LjkxNjY3LC0xNy45MTY2N3YtODZjMCwtOS44OTcxNyA4LjAxOTUsLTE3LjkxNjY3IDE3LjkxNjY3LC0xNy45MTY2N2g1MC4xNjY2N2M5Ljg5NzE3LDAgMTcuOTE2NjcsOC4wMTk1IDE3LjkxNjY3LDE3LjkxNjY3eiIgb3BhY2l0eT0iMC4zNSI+PC9wYXRoPjxwYXRoIGQ9Ik0xNjIuNDY4MzMsNzMuNzQ1bC00Mi44NTY2Nyw3NC44OTE2N2MtNC45NDUsOC42IC0xNS44MzgzMywxMS42MSAtMjQuNDM4MzMsNi41OTMzM2wtMzIuNjgsLTE5LjA2MzMzaDI3LjA5YzkuODksMCAxNy45MTY2NywtOC4wMjY2NyAxNy45MTY2NywtMTcuOTE2Njd2LTg2YzAsLTQuMDEzMzMgLTEuMzYxNjcsLTcuODExNjcgLTMuNTgzMzMsLTEwLjc1YzIuOTM4MzMsMC4wNzE2NyA1Ljk0ODMzLDAuODYgOC42NzE2NywyLjQzNjY3bDQzLjI4NjY3LDI1LjIyNjY3YzguNiw0Ljk0NSAxMS40NjY2NywxNS45ODE2NyA2LjU5MzMzLDI0LjU4MTY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+",
  },
  {
    title: "Likes",
    index: 2,
    icon: "https://img.icons8.com/glyph-neue/344/lightning-bolt.png",
  },
  {
    title: "Chats",
    index: 3,
    icon: "https://img.icons8.com/plumpy/344/red-yellow-cards.png",
  },
];

class DatingContainer extends React.Component {
  state = {
    activeTabIndex: 1,
    mockState: {
      loading_posts: false,
      posts: [1, 3, 2, 4, 6, 7, 8, 10, 11, 12, 13, 21, 22, 23],
      loading_more_posts: false,
      loading_events: false,
      events: [3],
      loading_more_events: false,
    },
  };

  componentDidMount = () => {
    const lat = 1.5074;
    const lng = 4.1178;
    const hash = geofire.geohashForLocation([lat, lng]);
    console.log({ hash });
  };

  setTabIndex = (index) => {
    this.setState({
      activeTabIndex: index,
    });
  };

  listRenderingHandler = ({ item }) => {
    if (this.state.activeTabIndex === 1) {
      return <DatingCard />;
    }
    if (this.state.activeTabIndex === 2) {
      return (
        <View>
          <Text>tab 2 card {item}</Text>
        </View>
      );
    }

    return null;
  };

  refreshHandler = () => {};
  loadMoreHandler = () => {};

  render() {
    return (
      <Screen>
        <TabbedScreenComponent
          activeTabIndex={this.state.activeTabIndex}
          // setTabIndex={this.setTabIndex}
          //   tabOptions={tabs}
          numColumns={3}
          removeTabBorder={true}
          TopHeader={
            <Header
              setTabIndex={this.setTabIndex}
              activeTabIndex={this.state.activeTabIndex}
              tabs={tabs}
            />
          }
          listRenderingHandler={this.listRenderingHandler}
          tabsConfig={[
            {
              keyExtractor: (item) => item,
              customLoader: <Text>loading</Text>,
              useCustomLoader: false,
              noDataComponent: (
                <View>
                  <Text>no data</Text>
                </View>
              ),
              allowRefresh: true,
              refreshHandler: this.refreshHandler,
            },
            {
              keyExtractor: (item) => item,
              noDataComponent: null,
              allowLoadMore: false,
              loadMoreHandler: this.loadMoreHandler,
            },
          ]}
          tabStates={[
            {
              loading: this.state.mockState.loading_posts,
              loading_more: this.state.mockState.loading_more_posts,
              data: this.state.mockState.posts,
              refreshing: false,
            },
            {
              loading: this.state.mockState.loading_events,
              loading_more: this.state.mockState.loading_more_events,
              data: this.state.mockState.events,
              refreshing: false,
            },
          ]}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default DatingContainer;
