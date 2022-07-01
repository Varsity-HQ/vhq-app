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
  doc,
} from "firebase/firestore";
import {
  CollectionHook,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

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

  const userRef = doc(db, "discover_profiles", profile.id);
  const userData = useDocumentData(userRef);

  let own_profile = userData[1] ? profile : userData[0];

  let hooks = [];
  const radiusInM = 301 * 1000;

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
    if (!hook[1]) {
      hook[0].forEach((x) => {
        accounts.push(x);
      });
    }
  }

  console.log({ hooks_count: hooks.length });

  // console.log({ accounts });

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
            data: [accounts[1]],
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
