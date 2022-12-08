import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import universityShortName from "../../util/universityShortName";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../AppText";
import TabNavigator from "../TabNavigator";
import Button from "../Button";
import colors from "../../config/colors";
import HomeUploading from "../Loaders/HomeUploading";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { normalizeText } from "../../util/responsivePx";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import db from "../../util/fb_admin";
import {
  DISCOVER_PAGE,
  NOTIFICATIONS,
  PROFILE,
  SEARCH,
  SEARCH_NAVIGATOR,
} from "../../navigation/routes";
import { RFValue } from "react-native-responsive-fontsize";
import OffersHeader from "./OffersHeader";
import HomeFeedMenu from "./HomeFeedMenu";
import Image from "../Image";
import Ricon from "react-native-remix-icon";
import { AccountBoxFill } from "react-native-remix-icon/src/icons";

const home_tabs = [
  {
    title: "Popular",
    index: 1,
    icon: null,
  },
  {
    title: "Recent",
    index: 2,
    icon: null,
  },
  {
    title: "Events",
    index: 3,
    icon: null,
  },
  {
    title: "Meet Friends",
    index: 4,
    navTo: DISCOVER_PAGE,
    icon: null,
  },
  {
    title: "Offers",
    index: 5,
    icon: null,
  },
];

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    uploading: state.data.new_post.uploading,
    user_id: state.core.accData.userID,
    university: state.core.accData.university,
    isShowingUnfilteredPosts: state.core.accData.isShowingUnfilteredPosts,
  };
};

const Header = ({
  uploading,
  navigation,
  profilepic,
  username,
  university,
  user_id,
  index = 1,
  setTab,
  isShowingUnfilteredPosts,
}) => {
  const userDocRef = doc(db, "accounts", user_id);
  const [user_snapshot, loading, error] = useDocumentData(userDocRef);

  return (
    <View
      style={{
        paddingBottom: 5,
        backgroundColor: colors.dark_2,
      }}
    >
      <View style={styles.header}>
        <View style={styles.left_section}>
          {/* <TouchableWithoutFeedback onPress={}> */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={[
              styles.header_uni_wrapper,
              { marginLeft: 10, backgroundColor: colors.dark },
            ]}
          >
            <Ricon name="menu-3-fill" color={colors.white} size={25} />
            {!user_snapshot?.new_notifications_opened && user_snapshot ? (
              <View style={styles.n_badge} />
            ) : null}
          </TouchableOpacity>

          {/* <Image
              transitionDuration={300}
              style={styles.profilepic}
              uri={profilepic}
            /> */}
          {/* </TouchableWithoutFeedback> */}
          <Text
            // numberOfLines={1}
            // adjustsFontSizeToFit
            allowFontScaling={false}
            style={styles.vhq_title}
          >
            VarsityHQ
          </Text>
        </View>
        <View style={styles.header_uni_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(SEARCH)}
            style={[styles.header_uni_wrapper, { marginRight: 10 }]}
          >
            <Ricon name="search-2-line" color={colors.secondary} size={23} />
            {!user_snapshot?.new_notifications_opened && user_snapshot ? (
              <View style={styles.n_badge} />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(NOTIFICATIONS)}
            style={styles.header_uni_wrapper}
          >
            <FontAwesome
              name="bell"
              color={colors.secondary}
              // style={{ marginRight: 10 }}
              size={23}
            />
            {!user_snapshot?.new_notifications_opened && user_snapshot ? (
              <View style={styles.n_badge} />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push(PROFILE, {
                username,
              })
            }
            style={
              (styles.header_uni_wrapper,
              {
                padding: 0,
              })
            }
          >
            <Image
              transitionDuration={300}
              style={styles.profilepic}
              uri={profilepic}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabbar_container}>
        <TabNavigator
          active={index}
          type={2}
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
            <Text style={{ fontWeight: "700" }}>Post in progress ... </Text>
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
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: index !== 5 ? null : 0,
              zIndex: 1,
            }}
          >
            <View>
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
                <SimpleHeaderText
                  isShowingUnfilteredPosts={isShowingUnfilteredPosts}
                  university={university}
                  tab={index}
                />
              </Text>
            </View>
            <View
              style={{
                paddingRight: 18,
              }}
            >
              <HomeFeedMenu />
            </View>
          </View>

          <LinearGradient
            colors={["#1160af", "#9e7b9b"]}
            // colors={["red", "white"]}oin
            style={styles.grad_diverder}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
      )}

      <OffersHeader show={index === 5} />
    </View>
  );
};

const SimpleHeaderText = ({ tab, university, isShowingUnfilteredPosts }) => {
  let textder = isShowingUnfilteredPosts
    ? "showing all posts"
    : "showing posts from " + universityShortName(university);
  if (tab === 5) {
    return null;
  }
  if (tab === 1) {
    return (
      <>
        <Text style={{ fontWeight: "700" }}>Explore top | </Text>
        <Text style={{ fontSize: 14 }}>{textder}</Text>
      </>
    );
  }
  if (tab === 2) {
    return (
      <>
        <Text style={{ fontWeight: "700" }}>Timeline | </Text>
        <Text style={{ fontSize: 14 }}>{textder}</Text>
      </>
    );
  }
  if (tab === 3) {
    return (
      <>
        <Text style={{ fontWeight: "700" }}>Events | </Text>
        <Text style={{ fontSize: 14 }}>
          showing events at {universityShortName(university)}
        </Text>
      </>
    );
  }
  return (
    <>
      <Text style={{ fontWeight: "700" }}>Timeline | </Text>
      <Text style={{ fontSize: 14 }}>{textder}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  n_badge: {
    height: 14,
    width: 14,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: colors.redish_2,
    borderRadius: 100,
    position: "absolute",
    top: -5,
    left: 0,
  },
  grad_diverder: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  grad_diverder_2: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    // padding: 10,
    // borderRadius: 100,
  },
  tab: {
    marginLeft: 10,
    height: "100%",
  },
  tabbar_container: {
    borderTopWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.dark,
  },
  profilepic: {
    height: height * 0.045,
    width: height * 0.045,
    position: "relative",
    // height: height * 0.05,
    // width: height * 0.05,
    // marginLeft: 15,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.dark_opacity_2,
    marginRight: 10,
  },
  header_uni_text: {
    marginLeft: 7,
    marginRight: 7,
    color: colors.secondary,
    fontWeight: "700",
    alignSelf: "center",
    fontSize: RFValue(14),
  },
  header_uni_wrapper: {
    borderWidth: 0,
    borderColor: colors.secondary_2,
    borderRadius: 50,
    padding: normalizeText(10),
    marginRight: 10,
    // paddingHorizontal: 15,
    // paddingHorizontal: normalizeText(18),
    // paddingVertical: normalizeText(8),
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.dark_2,
  },
  // header_uni_wrapper: {
  //   borderWidth: 2,
  //   borderColor: colors.secondary,
  //   borderRadius: 50,
  //   borderRightWidth: 0,
  //   borderTopRightRadius: 0,
  //   borderBottomRightRadius: 0,
  //   paddingHorizontal: normalizeText(18),
  //   paddingVertical: normalizeText(8),
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  header_uni_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // height: 10,
  },
  vhq_title: {
    fontSize: RFValue(23),
    // fontSize: 38%,
    color: colors.white,
    fontFamily: "Lobster-Regular",
    // borderWidth: 1,
    // borderColor: "red",
    // alignItems: "center",
    // flexDirection: "row",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: normalizeText(18),
    overflow: "hidden",
    // marginBottom: 10,
    backgroundColor: colors.dark,
  },
  container: {},
  left_section: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, null)(Header);
