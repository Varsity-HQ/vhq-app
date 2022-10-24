import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { connect } from "react-redux";
import Text from "../components/AppText";
import Header from "../components/headers/header3";
import Screen from "../components/Screen";
import colors from "../config/colors";
import ProfileTabFollowers from "./ProfileTabFollowers";
import ProfileTabFollowing from "./ProfileTabFollowing";

const renderScene = SceneMap({
  followers: ProfileTabFollowers,
  following: ProfileTabFollowing,
});

const mapStateToProps = (state) => {
  return {
    core: state.core.accData,
  };
};

function ProfileFollowing({ core }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "followers", title: "Followers" },
    { key: "following", title: "Following" },
  ]);

  return (
    <Screen>
      <Header backIcon title={core.username} />
      <TabView
        lazy={({ route }) => {
          route.name === "following";
          route.name === "followers";
        }}
        style={{
          backgroundColor: colors.dark,
        }}
        renderTabBar={(props) => (
          <TabBar
            indicatorStyle={{ backgroundColor: colors.primary }}
            activeColor={colors.white}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={{
                  color,
                  margin: 8,
                  fontWeight: "600",
                }}
              >
                {route.title}
              </Text>
            )}
            style={{
              backgroundColor: colors.dark,
              borderBottomColor: colors.primary,
              borderBottomWidth: 1,
            }}
            {...props}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, null)(ProfileFollowing);
