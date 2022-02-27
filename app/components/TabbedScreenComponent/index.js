import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../AppText";
import TabNavigator from "../TabNavigator";
import Footer from "./Footer";

class TabbedScreenComponent extends React.PureComponent {
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
    } = this.props;
    return (
      <FlatList
        style={{
          borderBottomColor: "red",
          borderBottomWidth: 0,
        }}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <>
            {TopHeader}
            {showTabHeader ? (
              <TabNavigator
                active={activeTabIndex}
                onPress={(i) => setTabIndex(i)}
                items={tabOptions ? tabOptions : []}
              />
            ) : null}
          </>
        }
        ListFooterComponent={
          <Footer
            loading={tabStates[activeTabIndex - 1].loading}
            loading_more={tabStates[activeTabIndex - 1].loading_more}
            useCustomLoader={tabsConfig[activeTabIndex - 1].useCustomLoader}
            customLoader={tabsConfig[activeTabIndex - 1].customLoader}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default TabbedScreenComponent;
