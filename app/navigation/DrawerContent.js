import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { Drawer } from "react-native-paper";
import colors from "../config/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Text from "../components/AppText";
import Image from "../components/Image";
import { normalizeText } from "../util/responsivePx";
import Button from "../components/Button";
import { connect } from "react-redux";
import {
  PROFILE,
  NOTIFICATIONS,
  PROFILE_SETTINGS,
  QCOINS_OFFERS,
  DISCOVER_PAGE,
  MY_MARKETPLACE_ADS,
  PROFILE_FOLLOWING,
  REFER_A_FRIEND,
} from "./routes";
import { logOutUser } from "../store/actions/actions";
import { save_post_user } from "../store/actions/profile";

import store from "../store/store";

const height = Dimensions.get("window").height;

const mapStateToProps = (state) => {
  return {
    product: state.core.accData.profilepic,
    account: state.core.accData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save_post_user: (post) => dispatch(save_post_user(post)),
  };
};

function DrawerContent({ props, product, account, save_post_user }) {
  const navigation = useNavigation();

  const handleNavigateToProfile = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.push(PROFILE, {
      username: account.username,
    });
    save_post_user(account);
  };

  const handleSignout = () => {
    Alert.alert(
      `@${account.username}`,
      `Are you sure you want to sign out ?. You will need to sign in again to use this app`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            store.dispatch(logOutUser());
          },
        },
      ],
    );
  };

  const goToFol = (tab) => {
    navigation.navigate(PROFILE_FOLLOWING, {
      tab: tab,
    });
  };

  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: colors.dark,
        borderRightColor: colors.primary,
        borderRightWidth: 0,
      }}
      {...props}
    >
      <View
        //@ts-ignore
        style={[styles.drawerContent]}
      >
        <Drawer.Section style={styles.drawerSection}>
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Image uri={product} style={styles.profilepic} />
          </View>
          <Text style={[styles.center, styles.name]}>
            {account.firstname}&nbsp;{account.surname}
          </Text>
          <Text style={[styles.center, styles.username]}>
            @{account.username}
          </Text>
          <View style={[styles.center, styles.row, { marginTop: 15 }]}>
            <TouchableOpacity onPress={() => goToFol("followers")}>
              <Text style={[styles.subText]}>
                {account.followers ? account.followers : 0} Followers
              </Text>
            </TouchableOpacity>
            <Text style={[styles.subText_2]}>&nbsp;|&nbsp;</Text>
            <TouchableOpacity onPress={() => goToFol("following")}>
              <Text style={[styles.subText]}>
                {parseInt(account.following) - 1} Following
              </Text>
            </TouchableOpacity>
          </View>
        </Drawer.Section>
        <View style={styles.divider} />
        <Drawer.Section>
          <TouchableOpacity
            onPress={handleNavigateToProfile}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <FontAwesome
              name="user-circle-o"
              size={25}
              color={colors.secondary}
            />
            <Text style={{ marginLeft: 20 }}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(NOTIFICATIONS);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <FontAwesome name="bell-o" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(DISCOVER_PAGE);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Ionicons name="earth" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>Discover Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(MY_MARKETPLACE_ADS);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <Entypo name="shop" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>My Ads</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(REFER_A_FRIEND);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <FontAwesome name="money" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>Earn from referrals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(QCOINS_OFFERS);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <FontAwesome name="tags" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>Qcoins & Offers</Text>
          </TouchableOpacity>

          {/* <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <MaterialCommunityIcons
              name="wallet"
              size={25}
              color={colors.secondary}
            />
            <Text style={{ marginLeft: 20 }}>Wallet</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              navigation.navigate(PROFILE_SETTINGS);
            }}
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 0,
            }}
          >
            <FontAwesome name="cog" size={25} color={colors.secondary} />
            <Text style={{ marginLeft: 20 }}>Settings</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={{ paddingHorizontal: 10, marginTop: 0 }}>
            {/* <Button type={3} title="Switch Content" /> */}
            <Button onPress={handleSignout} type={3} title="Sign out" />
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  subText_2: {
    color: colors.secondary_2,
  },
  subText: {
    fontSize: normalizeText(14),
  },
  divider: {
    height: 10,
    backgroundColor: colors.darkish2,
    marginVertical: 20,
  },
  name: {
    fontSize: normalizeText(17),
    fontWeight: "700",
    marginTop: 15,
  },
  username: {
    fontSize: 15,
    color: colors.secondary,
    marginTop: 5,
  },
  center: {
    alignSelf: "center",
  },
  profilepic: {
    height: height * 0.12,
    width: height * 0.12,
    borderRadius: 100,
  },
  drawerContent: {
    flex: 1,
    // backgroundColor: colors.dark_2,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerSection: {
    marginTop: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
