import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Button from "../../components/Button";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { v4 } from "uuid";
import {
  ADMIN_ALERT_USERS,
  ADMIN_MARKETPLACE_CATEGORIES,
  ADMIN_STATS_SUMMARY,
  REWARD_PRICINGS,
  PAYOUT_REQUESTS,
} from "../../navigation/routes";

const notifications = [
  {
    id: v4(),
    title: "Alert users to update app",
    route: ADMIN_ALERT_USERS,
  },
];

const stats = [
  {
    id: v4(),
    title: "Stats summary",
    route: ADMIN_STATS_SUMMARY,
  },
];
const marketplace = [
  {
    id: v4(),
    title: "Manage Categories",
    // route: ADMIN_MARKETPLACE_CATEGORIES,
    route: null,
  },
];
const reward_n_offers = [
  {
    id: v4(),
    title: "Manage Reward Pricings",
    route: REWARD_PRICINGS,
  },
  {
    id: v4(),
    title: "Payout Requests",
    route: PAYOUT_REQUESTS,
  },
];

function AdminHome({ navigation }) {
  const renderItemHandler = ({ item }) => {
    return (
      <Button
        onPress={() => {
          if (item.route) navigation.navigate(item.route);
        }}
        type={3}
        style={styles.button}
        title={item.title}
      />
    );
  };

  return (
    <Screen style={styles.container}>
      <SectionList
        ListHeaderComponent={<HeaderComponent />}
        keyExtractor={(item) => item.id}
        renderItem={renderItemHandler}
        sections={[
          {
            title: "Insights",
            data: stats,
          },
          {
            title: "Rewards & Offers",
            data: reward_n_offers,
          },
          {
            title: "Notification & Alerts",
            data: notifications,
          },
          // {
          //   title: "Marketplace",
          //   data: marketplace,
          // },
        ]}
        renderSectionHeader={({ section }) => {
          if (section.data.length === 0) {
            return null;
          }
          return (
            <View style={styles.pContainer}>
              <View
                style={{
                  backgroundColor: colors.darkish,
                  paddingHorizontal: 7,
                  paddingVertical: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "700", fontSize: RFValue(14) }}>
                  {section.title}
                </Text>
                <View style={styles.line} />
              </View>
            </View>
          );
        }}
      />
    </Screen>
  );
}

const HeaderComponent = () => {
  return (
    <>
      <Header showAccount noBorder backBtnText="Take me back" backIcon />
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Administration</Text>
            <Text style={styles.subText}>
              Control all VHQ apps and see insights
            </Text>
          </View>
        </View>
        <View></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  line: {
    height: 2,
    backgroundColor: colors.white,
    flex: 1,
    marginLeft: 10,
  },
  headerContainer: {
    paddingVertical: 30,
    borderBottomColor: colors.black,
    borderTopColor: colors.black,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 6,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
  },
  subText: {
    fontSize: 15,
    marginTop: 6,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default AdminHome;
