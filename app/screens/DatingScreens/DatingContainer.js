import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import TabbedScreenComponent from "../../components/TabbedScreenComponent";
import Text from "../../components/AppText";
import Header from "../../components/Dating/Header";
import DatingCard from "../../components/Dating/DatingCard";
import * as geofire from "geofire-common";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
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
  doc,
} from "firebase/firestore";
import {
  CollectionHook,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { MY_DISCOVER_PROFILE } from "../../navigation/routes";

const icon_size = 20;
const color_active = colors.white;
const color_inactive = colors.secondary_2;

const mapStateToProps = (state) => {
  return {
    loading: state.datingReducer.profile.loading,
    is_active: state.datingReducer.profile.is_active,
    profile: state.datingReducer.profile,
    discover_profile_id: state.core.accData.discover_profile_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_user_location: (data) => dispatch(update_user_location(data)),
  };
};

const tabs = [
  {
    title: "Near me",
    index: 1,
    icon: (
      <FontAwesome
        name="location-arrow"
        size={icon_size}
        color={colors.secondary}
      />
    ),
  },
  {
    title: "Pokes",
    index: 2,
    icon: (
      <MaterialIcons
        name="offline-bolt"
        size={icon_size}
        color={colors.secondary}
      />
    ),
  },
];

const DatingContainer = ({
  loading,
  is_active,
  profile,
  update_user_location,
  discover_profile_id,
  navigation,
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

  let userRef = null;
  let userData = null;
  let own_profile = profile;

  if (discover_profile_id) {
    userRef = doc(db, "discover_profiles", discover_profile_id);
    userData = useDocumentData(userRef);
    own_profile = userData[1] ? profile : userData[0];
  }

  let hooks = [];
  const radiusInM = 200 * 1000;
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];
  let used_distance = 0;

  for (const b of bounds) {
    const collectionRef = collection(db, "discover_profiles");
    const queryRef = query(
      collectionRef,
      orderBy("hashed_location"),
      where("is_active", "==", true),
      where("gender", "in", profile.show_me),
      startAt(b[0]),
      endAt(b[1]),
    );
    promises.push(getDocs(queryRef));
    hooks.push(useCollectionData(queryRef));
  }

  // console.log({ hooks });

  // Promise.all(promises)
  //   .then((snapshots) => {
  //     const matchingDocs = [];
  //     for (const snap of snapshots) {
  //       for (const doc of snap.docs) {
  //         const lat = doc.get("lat");
  //         const lng = doc.get("long");
  //         const distanceInKm = geofire.distanceBetween([lat, lng], center);
  //         const distanceInM = distanceInKm * 1000;
  //         if (distanceInM <= radiusInM) {
  //           matchingDocs.push(doc.data());
  //         }
  //       }
  //     }
  //     return matchingDocs;
  //   })
  //   .then((matchingDocs) => {
  //     console.log({ matchingDocs });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  useFocusEffect(
    React.useCallback(() => {
      if (!profile.hashed_location) {
        handle_without_location();
      } else {
        handle_with_location();
      }
    }, []),
  );

  const handle_with_location = () => {
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
        setCenter([location.coords?.latitude, location.coords?.longitude]);
      }
    })();
  };

  const setTabIndex = (index) => {
    setActiveTabIndex(index);
  };

  const listRenderingHandler = ({ item }) => {
    if (activeTabIndex === 1) {
      return <DatingCard data={item} />;
    }
    if (activeTabIndex === 2) {
      return <DatingCard data={item} />;
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

  let accounts = [];
  let loaders = [];

  for (const hook of hooks) {
    loaders.push(hook[1]);
    // console.log({ is_array: Array.isArray(hook[0]) });
    if (!hook[1]) {
      hook[0].forEach((x) => {
        if (discover_profile_id && x.id !== discover_profile_id) {
          const lat = x.lat;
          const lng = x.long;
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          // if (distanceInM <= radiusInM) {
          if (distanceInM <= profile.filters.distance * 1000) {
            accounts.push(x);
          }
        }
      });
    }
  }

  return (
    <Screen>
      <TabbedScreenComponent
        activeTabIndex={activeTabIndex}
        setTabIndex={setTabIndex}
        tabOptions={tabs}
        numColumns={2}
        tabStyle={2}
        // removeTabBorder={true}
        TopHeader={
          <Header
            data={own_profile}
            setTabIndex={setTabIndex}
            activeTabIndex={activeTabIndex}
            tabs={tabs}
          />
        }
        listRenderingHandler={listRenderingHandler}
        tabsConfig={[
          {
            keyExtractor: (item) => item.id,
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
            keyExtractor: (item) => item.id,
            noDataComponent: null,
            allowLoadMore: false,
            loadMoreHandler: loadMoreHandler,
          },
        ]}
        tabStates={[
          {
            loading: loaders.includes(true),
            loading_more: mockState.loading_more_posts,
            data: accounts,
            refreshing: false,
          },
          {
            loading: mockState.loading_events,
            loading_more: mockState.loading_more_events,
            data: [accounts[0]],
            refreshing: false,
          },
        ]}
      />
      <FloatingButton
        onPress={() => navigation.navigate(MY_DISCOVER_PROFILE)}
        dating={profile}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default connect(mapStateToProps, mapDispatchToProps)(DatingContainer);
