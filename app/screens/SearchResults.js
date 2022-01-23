import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Text from "../components/AppText";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";
import colors from "../config/colors";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectRefinementList,
} from "react-instantsearch-native";
import AccountsResultsTab from "../components/Search/AccountsResultsTab";
import TrendsResultsTab from "../components/Search/TrendsResultsTab";
import Searchinindicator from "../components/Search/Searchinindicator";

const searchClient = algoliasearch(
  "R37EQ47X30",
  "3655cf3408f922e47809314f91939c1d",
);

const Accounts = () => <AccountsResultsTab />;
const TrendsScreen = () => <TrendsResultsTab />;
const SecondRoute = () => <View />;

const renderScene = SceneMap({
  accounts: Accounts,
  trends: TrendsScreen,
  marketplace: SecondRoute,
});

function SearchResults(props) {
  const [searchState, setSearchState] = React.useState({});

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "accounts", title: "Accounts" },
    { key: "trends", title: "Trends" },
    { key: "marketplace", title: "Marketplace" },
  ]);

  const onSearchStateChange = (nextState) => {
    setSearchState({ ...searchState, ...nextState });
  };

  console.log({ index });

  return (
    <Screen style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={
          index === 0 ? "accounts" : index === 1 ? "hashtags" : "accounts"
        }
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <SearchHeader
          stackName={"SearchNavigator"}
          navigation={props.navigation}
          route={"route"}
        />
        <TabView
          style={{}}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          lazy={({ route }) => route.key === "trends"}
          renderTabBar={(props) => (
            <TabBar
              indicatorStyle={{
                backgroundColor: colors.darkish3,
                height: 3,
                borderTopLeftRadius: 100,
                borderTopRightRadius: 100,
              }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? colors.secondary : color,
                    margin: 8,
                    fontWeight: "600",
                  }}
                >
                  {route.title}
                </Text>
              )}
              style={{
                backgroundColor: colors.dark,
                borderBottomColor: colors.darkish3,
                borderBottomWidth: 2,
              }}
              {...props}
            />
          )}
        />
      </InstantSearch>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchResults;
