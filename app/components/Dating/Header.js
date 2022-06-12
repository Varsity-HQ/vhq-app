import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Text from "../AppText";
import Image from "../Image";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
const height = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";
import SwipeContainer from "./SwipeContainer";
import DatingVisibility from "./DatingVisibility";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
  };
};

const subTabs = [
  {
    index: 1,
    title: "all",
    icon: (
      <MaterialCommunityIcons
        color={colors.dark_2}
        size={30}
        name="heart-multiple-outline"
      />
    ),
  },
  {
    index: 2,
    title: "all",
    icon: (
      <MaterialCommunityIcons
        color={colors.dark_2}
        size={30}
        name="star-box-multiple-outline"
      />
    ),
  },
];

function Header({ profilepic, tabs, activeTabIndex, setTabIndex }) {
  return (
    <View style={styles.main_container}>
      <View style={styles.top_container}>
        <Image style={styles.profilepic} uri={profilepic} />
        <View style={[styles.menu_container]}>
          {tabs.map((x) => (
            <TouchableOpacity
              onPress={() => setTabIndex(x.index)}
              style={[
                styles.tab_button,
                {
                  backgroundColor:
                    activeTabIndex === x.index
                      ? colors.primary
                      : colors.transparent,
                  borderColor:
                    activeTabIndex === x.index
                      ? colors.circleColor
                      : colors.transparent,
                },
              ]}
              key={x.index}
            >
              {activeTabIndex === x.index ? x.icon_a : x.icon}
              {/* <Text
                style={[
                  styles.titleStyle,
                  {
                    color:
                      activeTabIndex === x.index
                        ? colors.light
                        : colors.secondary_2,
                    fontSize:
                      activeTabIndex === x.index ? RFValue(25) : RFValue(20),
                  },
                ]}
              >
                {x.title}
              </Text> */}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.right_eye}>
          <Ionicons name="ios-eye" size={24} color={colors.white} />
          <Text style={styles.eye_counter}>2</Text>
        </View>
      </View>
      <DatingVisibility />
      {/* <SwipeContainer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 40,
    width: 40,
  },
  eye_counter: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 5,
  },
  right_eye: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  main_container: {
    marginBottom: 15,
  },
  university: {
    fontSize: RFValue(15),
    fontFamily: "SF-Pro-Rounded-Bold",
    color: colors.dark_2,
  },
  sideItem: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingRight: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    // borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  subtab_button: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 10,
  },
  titleStyle: {
    fontSize: RFValue(18),
    // fontWeight: "700",
    fontFamily: "SF-Pro-Rounded-Bold",
  },
  tab_button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.transparent,
  },
  menu_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.dark_2,
    borderRadius: 100,
    overflow: "hidden",
  },
  top_container: {
    paddingVertical: 20,
    paddingRight: 12,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: colors.secondary_2,
    borderBottomRightRadius: 30,
    backgroundColor: colors.dark,
  },
  bottom_container: {
    // paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 10,
    backgroundColor: colors.dark,
  },
  profilepic: {
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: 100,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, null)(Header);
