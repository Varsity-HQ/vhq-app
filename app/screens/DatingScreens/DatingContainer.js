import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import Header from "../../components/Dating/Header";
import DatingCard from "../../components/Dating/DatingCard";
import * as geofire from "geofire-common";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import FloatingButton from "../../components/FloatingButton";
import { connect } from "react-redux";
import DatingIntroScreen from "./DatingIntroScreen";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { update_user_location } from "../../store/actions/datingActions";
import db from "../../util/fb_admin";
import {
  collection,
  startAt,
  endAt,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const icon_size = 35;
const color_active = colors.white;
const color_inactive = colors.secondary_2;

const mapStateToProps = (state) => {
  return {
    loading: state.datingReducer.profile.loading,
    is_active: state.datingReducer.profile.is_active,
    profile: state.datingReducer.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_user_location: (data) => dispatch(update_user_location(data)),
  };
};

const tabs = [
  {
    title: "Browse",
    index: 1,
    icon: (
      <MaterialIcons name="explore" size={icon_size} color={color_inactive} />
    ),
    icon_a: (
      <MaterialIcons name="explore" size={icon_size} color={color_active} />
    ),
  },
  {
    title: "Likes",
    index: 2,
    icon: (
      <MaterialIcons
        name="offline-bolt"
        size={icon_size}
        color={color_inactive}
      />
    ),
    icon_a: (
      <MaterialIcons
        name="offline-bolt"
        size={icon_size}
        color={color_active}
      />
    ),
  },
  {
    title: "Chats",
    index: 3,
    icon: (
      <Ionicons
        name="navigate-circle"
        size={icon_size}
        color={color_inactive}
      />
    ),
    icon_a: (
      <Ionicons name="navigate-circle" size={icon_size} color={color_active} />
    ),
  },
];

const DatingContainer = ({
  loading,
  is_active,
  profile,
  update_user_location,
}) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(1);
  const [mockState, setMockState] = React.useState({
    loading_posts: false,
    posts: [1, 3, 2],
    loading_more_posts: false,
    loading_events: false,
    events: [3],
    loading_more_events: false,
  });
  const [center, setCenter] = React.useState([0, 0]);
  const radiusInM = 50 * 1000;

  let hooks = [];

  useFocusEffect(
    React.useCallback(() => {
      if (!profile.hashed_location) {
        handle_without_location();
      } else {
        handle_with_location();
      }
      console.log("ndasvika");
    }, []),
  );

  const handle_with_location = () => {
    console.log("with location");
    setCenter([profile.lat, profile.long]);
  };

  const handle_without_location = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        update_user_location(location);
        setCenter([data.coords?.latitude, data.coords?.longitude]);
      }
    })();
  };

  const setTabIndex = (index) => {
    setActiveTabIndex(index);
  };

  const listRenderingHandler = ({ item }) => {
    if (activeTabIndex === 1) {
      return <DatingCard />;
    }
    if (activeTabIndex === 2) {
      return <DatingCard />;
    }
    return null;
  };

  const refreshHandler = () => {};
  const loadMoreHandler = () => {};

  if (loading) {
    return <DatingIntroScreen loading={true} />;
  }
  if (!loading && !is_active) {
    return <DatingIntroScreen loading={false} />;
  }

  const bounds = geofire.geohashQueryBounds(center, radiusInM);

  const promises = [];

  for (const b of bounds) {
    const collectionRef = collection(db, "discover_profiles");
    const queryRef = query(
      collectionRef,
      orderBy("hashed_location"),
      where("is_active", "==", true),
      startAt(b[0]),
      endAt(b[1]),
    );
    // promises.push(getDocs(queryRef));
    hooks.push(useCollectionData(queryRef));
  }

  let profiles = [];
  let overal_loading = [];
  let errors = [];

  for (const h of hooks) {
    Array.isArray(h[0]) &&
      h[0].forEach((x) => {
        profiles.push(x);
      });
    overal_loading.push(h[1]);
    if (h[2]) {
      errors.push(h[2]);
    }
  }

  console.log({ overal_loading });
  console.log({ profiles });
  console.log({ errors });

  return (
    <Screen>
      <TabbedScreenComponent
        activeTabIndex={activeTabIndex}
        // setTabIndex={this.setTabIndex}
        //   tabOptions={tabs}
        numColumns={2}
        removeTabBorder={true}
        TopHeader={
          <Header
            setTabIndex={setTabIndex}
            activeTabIndex={activeTabIndex}
            tabs={tabs}
          />
        }
        listRenderingHandler={listRenderingHandler}
        tabsConfig={[
          {
            keyExtractor: (item) => item,
            customLoader: <Text>loading</Text>,
            useCustomLoader: false,
            noDataComponent: (
              <View>
                <Text>no data</Text>
              </View>
            ),
            allowRefresh: true,
            refreshHandler: refreshHandler,
          },
          {
            keyExtractor: (item) => item,
            noDataComponent: null,
            allowLoadMore: false,
            loadMoreHandler: loadMoreHandler,
          },
        ]}
        tabStates={[
          {
            loading: mockState.loading_posts,
            loading_more: mockState.loading_more_posts,
            data: mockState.posts,
            refreshing: false,
          },
          {
            loading: mockState.loading_events,
            loading_more: mockState.loading_more_events,
            data: mockState.events,
            refreshing: false,
          },
        ]}
      />
      <FloatingButton dating />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(DatingContainer);
