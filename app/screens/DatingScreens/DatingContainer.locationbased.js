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
  limit,
  getDoc,
  updateDoc,
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
    reported_ids: state.filterReducer.reported_ids,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_user_location: (data) => dispatch(update_user_location(data)),
  };
};

const DatingContainer = ({
  loading,
  is_active,
  profile,
  update_user_location,
  discover_profile_id,
  navigation,
  reported_ids,
}) => {
  if (loading) {
    return <DatingIntroScreen loading={true} />;
  }
  if (!loading && !is_active) {
    return <DatingIntroScreen loading={false} />;
  }

  const [activeTabIndex, setActiveTabIndex] = React.useState(1);
  const [center, setCenter] = React.useState([0, 0]);
  const [pokes_loading, setPokesLoading] = React.useState(true);
  const [pokesProfiles, setPokesProfiles] = React.useState([]);

  let userRef = null;
  let userData = null;
  let own_profile = profile;

  if (discover_profile_id && is_active) {
    userRef = doc(db, "discover_profiles", discover_profile_id);
    userData = useDocumentData(userRef);
    own_profile = userData[1] ? profile : userData[0];
  } else {
    userRef = null;
    userData = null;
    own_profile = profile;
  }

  const tabs = [
    {
      title: "Browse",
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
      attention: own_profile.poked,
      icon: (
        <MaterialIcons
          name="offline-bolt"
          size={icon_size}
          color={colors.secondary}
        />
      ),
    },
  ];

  let hooks = [];
  const radiusInM = 200 * 1000;
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  let promises = [];

  for (const b of bounds) {
    if (is_active) {
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
    } else {
      hooks = [];
      promises = [];
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (is_active) {
        if (!profile.hashed_location) {
          handle_without_location();
        } else {
          handle_with_location();
        }
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
    if (index === 2 && activeTabIndex !== 2) {
      handle_pokes_load();
    }
  };

  const handle_pokes_load = async () => {
    setPokesLoading(true);
    let collectionRef = collection(db, "poked_users");
    let collectionQuery = query(
      collectionRef,
      where("poked_user", "==", discover_profile_id),
      orderBy("datePoked", "desc"),
      limit(15),
    );
    await getDocs(collectionQuery)
      .then((data) => {
        let promises = [];
        data.forEach((x) => {
          let docRef = doc(db, "discover_profiles", x.data().poked_by);
          promises.push(getDoc(docRef));
        });
        return Promise.all(promises);
      })
      .then((data) => {
        let results = [];
        data.forEach((x) => {
          results.push(x.data());
        });
        setPokesProfiles(results);
        setPokesLoading(false);
        let userRef = doc(db, "discover_profiles", discover_profile_id);
        return updateDoc(userRef, {
          poked: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setPokesLoading(true);
      });
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

  let accounts = [];
  let loaders = [];

  if (is_active) {
    for (const hook of hooks) {
      loaders.push(hook[1]);
      // console.log({ is_array: Array.isArray(hook[0]) });
      if (!hook[1]) {
        hook[0].forEach((x) => {
          if (
            discover_profile_id &&
            x.id !== discover_profile_id &&
            !own_profile.blocked.includes(x.id) &&
            !x.blocked.includes(discover_profile_id)
          ) {
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
                <Text></Text>
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
            loading_more: false,
            data: accounts,
            refreshing: false,
          },
          {
            loading: pokes_loading,
            loading_more: false,
            data: pokesProfiles,
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
