import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Text from "../AppText";
import Image from "../Image";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
const height = Dimensions.get("window").height;

import SwipeContainer from "./SwipeContainer";

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
        <View
          style={[
            styles.menu_container,
            {
              paddingLeft: 0,
            },
          ]}
        >
          {tabs.map((x) => (
            <TouchableOpacity
              onPress={() => setTabIndex(x.index)}
              style={[styles.tab_button]}
              key={x.index}
            >
              <Text
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
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Image style={styles.profilepic} uri={profilepic} />
      </View>
      <View style={styles.bottom_container}>
        <View style={styles.menu_container}>
          {subTabs.map((x) => (
            <TouchableOpacity
              key={x.index}
              // onPress={() => setTabIndex(x.index)}
              style={[styles.subtab_button]}
            >
              {x.icon}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sideItem}>
          <FontAwesome
            color={colors.dark_2}
            style={{
              marginRight: 4,
            }}
            size={18}
            name="university"
          />
          <Text style={styles.university}>UJ</Text>
        </View>
      </View>
      <SwipeContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: colors.secondary_2,
  },
  university: {
    fontSize: RFValue(15),
    fontFamily: "SF-Pro-Rounded-Bold",
    color: colors.dark_2,
  },
  sideItem: {
    backgroundColor: colors.secondary_2,
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
    backgroundColor: colors.secondary_2,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menu_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  top_container: {
    // paddingHorizontal: 20,
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
    height: height * 0.055,
    width: height * 0.055,
    borderRadius: 100,
  },
});

export default connect(mapStateToProps, null)(Header);
