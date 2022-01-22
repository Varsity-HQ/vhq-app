import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Text from "../components/AppText";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";
import colors from "../config/colors";

const FirstRoute = ({ jumpTo }) => <View />;
const SecondRoute = () => <View />;
const renderScene = SceneMap({
  first: FirstRoute,
  submissions: SecondRoute,
  marketplace: SecondRoute,
});

function SearchResults(props) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Accounts" },
    { key: "submissions", title: "Trends" },
    { key: "marketplace", title: "Marketplace" },
  ]);
  return (
    <Screen style={styles.container}>
      <SearchHeader
        stackName={"SearchNavigator"}
        navigation={"navigation"}
        route={"route"}
      />
      <TabView
        style={{}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy={({ route }) => route.key === "submissions"}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchResults;
