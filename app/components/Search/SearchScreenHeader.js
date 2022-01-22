import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";
import RIcon from "react-native-remix-icon";
import { useNavigation } from "@react-navigation/native";
import { SEARCH_RESULTS } from "../../navigation/routes";
import { StatusBar } from "expo-status-bar";
import Button from "../Button";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import TabNavigator from "../TabNavigator";

const home_tabs = [
  {
    title: "Trends",
    index: 1,
    icon: (
      <MaterialCommunityIcons
        color={colors.white}
        size={18}
        name="post-outline"
      />
    ),
  },
  {
    title: "Pictures",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="calendar-o" />,
  },
  {
    title: "Groups",
    index: 3,
    icon: (
      <FontAwesome color={colors.white} size={16} name="arrow-circle-o-right" />
    ),
  },
];

function SearchScreenHeader(props) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Explore</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(SEARCH_RESULTS)}
          style={styles.search_button}
        >
          <RIcon name="search-2-line" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <TabNavigator
        type={2}
        style={{ marginBottom: 10 }}
        active={1}
        onPress={(i) => setTab(i)}
        items={home_tabs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "700",
    fontFamily: "Lobster-Regular",
  },
});

export default SearchScreenHeader;
