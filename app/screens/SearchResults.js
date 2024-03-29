import React, { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Text from "../components/AppText";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";
import colors from "../config/colors";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-native";
import AccountsResultsTab from "../components/Search/AccountsResultsTab";
import TrendsResultsTab from "../components/Search/TrendsResultsTab";
import Searchinindicator from "../components/Search/Searchinindicator";
import MarketplaceTab from "../components/Search/MarketplaceTab";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

const searchClient = algoliasearch(
  "R37EQ47X30",
  "3655cf3408f922e47809314f91939c1d",
);

const Accounts = () => <AccountsResultsTab />;
const TrendsScreen = () => <TrendsResultsTab />;
const Marketplace = () => <MarketplaceTab />;

const renderScene = SceneMap({
  accounts: Accounts,
  trends: TrendsScreen,
  marketplace: Marketplace,
});

function SearchResults(props) {
  const [searchState, setSearchState] = React.useState({});
  const navigation = useNavigation();
  const route = useRoute();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "accounts", title: "Accounts" },
    { key: "trends", title: "Trends" },
    { key: "marketplace", title: "Marketplace" },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      let page = route.params?.page;
      if (page) {
        setIndex(page - 1);
      }
    }, []),
  );

  const onSearchStateChange = (nextState) => {
    setSearchState({ ...searchState, ...nextState });
  };

  return (
    <Screen style={styles.container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={
          index === 0
            ? "accounts"
            : index === 1
            ? "hashtags"
            : index === 2
            ? "marketplace"
            : "accounts"
        }
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        {index === 0 && (
          <Configure
            filters='university:"University of Johannesburg"'
            hitsPerPage={10}
            distinct
          />
        )}

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
