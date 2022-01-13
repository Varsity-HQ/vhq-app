import React, { useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Header from "../components/headers/header3";
import Screen from "../components/Screen";
import colors from "../config/colors";
import PollSummary from "../components/Poll/PollSummary";
import PollVoters from "../components/Poll/PollVoters";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Text from "../components/AppText";
import { connect } from "react-redux";
import { reset_poll_details_page } from "./../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    poll_details: state.data.poll_details,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reset_poll_details_page: () => dispatch(reset_poll_details_page()),
  };
};

const FirstRoute = ({ jumpTo }) => <PollSummary jumpTo={jumpTo} />;

const SecondRoute = () => <PollVoters />;

const renderScene = SceneMap({
  first: FirstRoute,
  submissions: SecondRoute,
});

function PollDetails({ navigation, poll_details, reset_poll_details_page }) {
  const layout = useWindowDimensions();

  useEffect(() => {
    if (!poll_details.poll || poll_details.loading) {
      navigation.goBack();
    }
    return () => {
      reset_poll_details_page();
    };
  }, [poll_details]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Summary" },
    { key: "submissions", title: "Submissions" },
  ]);

  return (
    <Screen style={styles.container}>
      <Header
        style={{
          borderBottomWidth: 0,
        }}
        backPress={() => navigation.goBack()}
        title="Poll details"
        loading={false}
      />

      {!poll_details.loading && (
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
                backgroundColor: colors.secondary,
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
                borderBottomColor: colors.secondary,
                borderBottomWidth: 2,
              }}
              {...props}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails);
