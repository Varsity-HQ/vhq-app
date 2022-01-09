import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Image as LocalImage,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import universityShortName from "../../util/universityShortName";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Text from "../AppText";
import TabNavigator from "../TabNavigator";
import colors from "../../config/colors";
import { ProgressBar } from "react-native-paper";
import HomeUploading from "../Loaders/HomeUploading";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const home_tabs = [
  {
    title: "Posts",
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
    uploading: state.data.new_post.uploading,
  };
};

const Header = ({
  uploading,
  navigation,
  profilepic,
  username,
  university,
}) => {
  const [index, setTab] = useState(1);

  return (
    <View>
      <View style={styles.header}>
        <View style={{ width: "30%" }}>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Profile", { username: username })
            }
          >
            {profilepic ? (
              <Image
                transitionDuration={300}
                style={styles.profilepic}
                uri={profilepic}
              />
            ) : (
              <LocalImage
                style={styles.profilepic}
                source={require("../../assets/avatar.png")}
              />
            )}
          </TouchableWithoutFeedback>
        </View>
        <Text allowFontScaling={false} style={styles.vhq_title}>
          VarsityHQ
        </Text>
        <View style={styles.header_uni_container}>
          <View style={styles.header_uni_wrapper}>
            <FontAwesome name="university" color={colors.secondary} size={15} />
            <Text style={styles.header_uni_text}>
              {universityShortName(university)}
            </Text>
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

      {uploading ? (
        <View
          style={{
            // padding: 10,
            borderBottomColor: "black",
            position: "relative",
            borderTopWidth: 2,
            // marginTop: 10,
          }}
        >
          <View
            style={{
              padding: 18,
              zIndex: 1,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* <HomeUploading /> */}
            <Text style={{ fontWeight: "700" }}>Posting post ... </Text>
            {/* <Text style={{ fontSize: 14 }}>showing recent posts</Text> */}
          </View>
          <LinearGradient
            colors={["#1160af", "#9e7b9b"]}
            // colors={["red", "white"]}oin
            style={styles.grad_diverder}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
      ) : (
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
            // colors={["red", "white"]}oin
            style={styles.grad_diverder}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
      )}
    </View>
  );
};

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

  tab: {
    marginLeft: 10,
    height: "100%",
  },
  tabbar_container: {
    borderTopWidth: 3,
    borderRadius: 0,
    borderTopColor: colors.primary,
    backgroundColor: colors.dark,
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
    fontWeight: "800",
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
    overflow: "hidden",
  },
  container: {},
});

export default connect(mapStateToProps, null)(Header);
