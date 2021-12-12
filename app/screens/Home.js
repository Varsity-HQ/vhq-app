import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useFonts } from "expo-font";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import TabNavigator from "../components/TabNavigator";

const home_tabs = [
  {
    title: "All",
    index: 1,
    icon: (
      <Ionicons color={colors.white} size={18} name="ios-file-tray-stacked" />
    ),
  },
  {
    title: "Events",
    index: 2,
    icon: <FontAwesome color={colors.white} size={16} name="calendar-o" />,
  },
  {
    title: "Discover",
    index: 3,
    icon: (
      <FontAwesome color={colors.white} size={16} name="arrow-circle-o-right" />
    ),
  },
  {
    title: "Offers",
    index: 4,
    icon: <FontAwesome color={colors.white} size={16} name="tags" />,
  },
];

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
  };
};

function Home({ navigation, profilepic }) {
  const [index, setTab] = useState(1);
  return (
    <Screen>
      <ScrollView>
        <View style={styles.header}>
          <View style={{ width: "30%" }}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile", {})}
            >
              <Image
                style={styles.profilepic}
                source={{
                  uri: profilepic
                    ? profilepic
                    : require("../assets/avatar.png"),
                }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.vhq_title}>VarsityHQ</Text>
          <View style={styles.header_uni_container}>
            <View style={styles.header_uni_wrapper}>
              <FontAwesome
                name="university"
                color={colors.secondary}
                size={15}
              />
              <Text style={styles.header_uni_text}>UJ</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabbar_container}>
          <TabNavigator
            active={index}
            onPress={(i) => setTab(i)}
            items={home_tabs}
          />
        </View>
        <View
          style={{
            // padding: 10,
            borderBottomColor: "black",
            position: "relative",
            borderTopWidth: 2,
            // marginTop: 10,
          }}
        >
          <Text
            style={{
              padding: 18,
              fontSize: 18,
              color: "#fff",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontWeight: "700" }}>Timeline | </Text>
            <Text style={{ fontSize: 14 }}>showing recent posts</Text>
          </Text>
          <LinearGradient
            colors={["#1160af", "#9e7b9b"]}
            // colors={["red", "white"]}
            style={styles.grad_diverder}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
        <View>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grad_diverder: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  tab_Container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab_indicator_2: {
    alignSelf: "center",
    width: 7,
    height: 7,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  tab_indicator_1: {
    width: "100%",
    height: 6,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    // fontWeight: "600",
  },
  tab: {
    marginLeft: 10,
    height: "100%",
  },
  tabbar_container: {
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
  profilepic: {
    height: 50,
    width: 50,
    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.dark_opacity_2,
  },
  header_uni_text: {
    marginLeft: 7,
    color: colors.secondary,
    fontWeight: "700",
    alignSelf: "center",
    fontSize: 16,
  },
  header_uni_wrapper: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 50,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",

    // height: 10,
  },
  header_uni_container: {
    width: "30%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    // height: 10,
  },
  vhq_title: {
    fontSize: 38,
    fontWeight: "700",
    color: colors.white,
    fontFamily: "Lobster-Regular",
    width: "40%",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  container: {},
});

export default connect(mapStateToProps, null)(Home);
