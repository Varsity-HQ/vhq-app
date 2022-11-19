// import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../AppText";
import TabNavigator from "../TabNavigator";
import Footer from "./Footer";

class TabbedScreenComponent extends React.PureComponent {
  //
  refreshTrigger = () => {
    if (
      this.props.tabsConfig[this.props.activeTabIndex - 1].allowRefresh &&
      this.props.tabsConfig[this.props.activeTabIndex - 1].refreshHandler
    ) {
      return this.props.tabsConfig[
        this.props.activeTabIndex - 1
      ].refreshHandler();
    } else null;
  };

  //
  reachedEndTrigger = () => {
    if (
      this.props.tabsConfig[this.props.activeTabIndex - 1].allowLoadMore &&
      this.props.tabsConfig[this.props.activeTabIndex - 1].loadMoreHandler
    ) {
      return this.props.tabsConfig[
        this.props.activeTabIndex - 1
      ].loadMoreHandler();
    } else null;
  };
  //
  render() {
    const {
      TopHeader,
      TabHeader,
      activeTabIndex,
      setTabIndex,
      tabOptions,
      showTabHeader = true,
      keyExtractor,
      tabStates,
      tabsConfig,
      listRenderingHandler,
      initialNumToRender,
      handleRefresh,
      onEndReachedThreshold,
      tabStyle,
      tabCounter,
      specifyPageHeader,
      removeTabBorder,
      numColumns = 1,
      style,
      estimatedItemSize = 344,
    } = this.props;
    return (
      <FlatList
        estimatedItemSize={estimatedItemSize}
        style={style ? style : null}
        initialNumToRender={initialNumToRender ? initialNumToRender : 10}
        keyExtractor={tabsConfig[activeTabIndex - 1].keyExtractor}
        ListHeaderComponent={
          <>
            {TopHeader}
            {showTabHeader ? (
              <TabNavigator
                style={removeTabBorder ? styles.borderlessTabStyle : {}}
                type={tabStyle ? tabStyle : 1}
                active={activeTabIndex}
                onPress={(i) => setTabIndex(i)}
                items={tabOptions ? tabOptions : []}
              />
            ) : null}
          </>
        }
        data={
          tabStates[activeTabIndex - 1].loading
            ? []
            : tabStates[activeTabIndex - 1].data
        }
        numColumns={numColumns}
        renderItem={listRenderingHandler}
        ListFooterComponent={
          <Footer
            noDataComponent={tabsConfig[activeTabIndex - 1].noDataComponent}
            data={tabStates[activeTabIndex - 1].data}
            loading={tabStates[activeTabIndex - 1].loading}
            loading_more={tabStates[activeTabIndex - 1].loading_more}
            useCustomLoader={tabsConfig[activeTabIndex - 1].useCustomLoader}
            customLoader={tabsConfig[activeTabIndex - 1].customLoader}
          />
        }
        onRefresh={this.refreshTrigger}
        refreshing={
          tabStates[activeTabIndex - 1].refreshing
            ? tabStates[activeTabIndex - 1].refreshing
            : false
        }
        onEndReached={this.reachedEndTrigger}
        onEndReachedThreshold={
          onEndReachedThreshold ? onEndReachedThreshold : 0.8
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  borderlessTabStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

export default TabbedScreenComponent;
