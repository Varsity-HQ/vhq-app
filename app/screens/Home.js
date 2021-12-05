import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

function Home(props) {
  const [loaded] = useFonts({
    Lobster: require("../Fonts/Lobster-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Screen>
      <ScrollView>
        <View style={styles.header}>
          <View style={{ width: "30%" }}>
            <Image
              style={styles.profilepic}
              source={{
                uri: "https://varsityhq.imgix.net/vhq_img202130693415.jpeg",
              }}
            />
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
          <ScrollView horizontal={true}>
            <View style={styles.tab}>
              <View style={styles.tab_indicator_1}></View>
              <View style={styles.tab_Container}>
                <Text style={styles.text}>All</Text>
              </View>
              <View style={styles.tab_indicator_2}></View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            padding: 10,
            borderBottomColor: "black",
            borderTopWidth: 2,
            marginTop: 10,
          }}
        >
          <Text>Timeline | showing recent posts</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    height: 45,
    width: 45,
    marginLeft: 15,
    borderRadius: 100,
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
    fontFamily: "Lobster",
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

export default Home;
