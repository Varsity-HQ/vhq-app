import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";
import RIcon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { SEARCH_RESULTS } from "../../navigation/routes";
import { StatusBar } from "expo-status-bar";
import Button from "../Button";
import {
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import TabNavigator from "../TabNavigator";
import Adverts from "./Adverts";

import { PROFILE_SETTINGS } from "../../navigation/routes";

const home_tabs = [
  {
    title: "Trends",
    index: 1,
    icon: <Ionicons color={colors.white} size={18} name="trending-up" />,
  },
  {
    navTo: PROFILE_SETTINGS,
    title: "Settings",
    index: 2,
    icon: <SimpleLineIcons color={colors.white} size={16} name="settings" />,
  },
  // {
  //   title: "Groups",
  //   index: 3,

  //   icon: (
  //     <MaterialCommunityIcons
  //       color={colors.white}
  //       size={16}
  //       name="account-group-outline"
  //     />
  //   ),
  // },
];

function SearchScreenHeader({
  actionsDisable = false,
  active = 1,
  setTab,
  data,
}) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text allowFontScaling={false} style={styles.title}>
            Explore <Text style={styles.dim_text}>For You</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(SEARCH_RESULTS)}
          style={styles.search_button}
        >
          <RIcon name="search-2-line" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <Adverts ads={data.adverts} />
      <TabNavigator
        type={2}
        style={{ marginBottom: 10 }}
        active={active}
        actionsDisable={actionsDisable}
        onPress={(i) => setTab(i)}
        items={home_tabs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dim_text: {
    color: colors.darkish2,
  },
  subHeader: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderTopColor: colors.secondary_2,
  },
  search_button: {
    backgroundColor: colors.darkish2,
    padding: 10,
    borderRadius: 100,
  },
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.dark,
    // marginBottom: 10,
  },
  title: {
    color: colors.white,
    fontSize: normalizeText(35),
    fontWeight: "800",
    fontFamily: "Lobster-Regular",
  },
});

export default SearchScreenHeader;
