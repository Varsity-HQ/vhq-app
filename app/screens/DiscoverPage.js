import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import FancyHeader from "../components/headers/FancyHeader";
import Screen from "../components/Screen";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import { connect } from "react-redux";
import universityShortName from "../util/universityShortName";
import store from "../store/store";
import { DATING_NAVIGATOR, PROFILE_SETTINGS } from "../navigation/routes";
import MarketplaceAds from "../components/Marketplace/MarketplaceAds";
import AccountsGrid from "../components/AccountsGrid";
import Button from "../components/Button";
import Text from "../components/AppText";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { DATING_INTRO } from "../navigation/routes";
import { load_page_data } from "../store/actions/discoveryPage";
import navigate from "../navigation/rootNavigation";
import AccountsSlider from "../components/AccountsSlider";
import axios from "axios";

const mapStateToProps = (state) => {
  return {
    university: state.core.accData.university,
    user_following: state.core.accData.user_following,
    discoveryPage: state.discoveryPage,
    yearOfStudy: state.core.accData.yearOfStudy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_page_data: () => dispatch(load_page_data()),
  };
};

function DiscoverPage({
  university,
  discoveryPage,
  load_page_data,
  yearOfStudy,
}) {
  const [activeTab, setActiveTab] = useState(1);
  const [dData, setdData] = useState(null);

  useEffect(() => {
    load_page_data();
  }, []);

  const tabs = [
    {
      title: `at ${universityShortName(university)}`,
      index: 1,
      icon: <FontAwesome color={colors.white} size={14} name="university" />,
    },
    {
      textColor: colors.secondary,
      title: "Settings",
      index: 2,
      navTo: PROFILE_SETTINGS,
      // icon: <SimpleLineIcons color={colors.white} size={16} name="picture" />,
    },
    // {
    //   title: "Groups",
    //   index: 3,

    //   icon: (
    //     <MaterialCommunityIcons
    //       color={colors.white}
    //       size={16}
    //       name="account-group-outline"
    //     />
    //   ),
    // },
  ];

  const handleChangeTab = (index) => {
    setActiveTab(index);
  };

  if (discoveryPage.loading) {
    return (
      <Screen scroll style={styles.container}>
        <FancyHeader
          headerTextTitle="Discover"
          headerTextFaded={`@${universityShortName(university)}`}
          active={activeTab}
          tabs={tabs}
          // type={1}
          setTab={(i) => handleChangeTab(i)}
        />
        <View style={styles.section_container}>
          <View>
            <Text
              style={{
                fontWeight: "700",
                fontSize: RFValue(16),
                marginHorizontal: 10,
                marginBottom: 10,
                backgroundColor: colors.dark_opacity_2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                borderColor: colors.secondary_2,
                borderWidth: 0,
                overflow: "hidden",
                color: colors.secondary,
              }}
            >
              Loading..
            </Text>
            <View style={styles.header}>
              <View style={{ fontWeight: "700", marginTop: 14 }}></View>
            </View>
          </View>
          <AccountsSlider loading />
        </View>
        <View style={{ padding: 10 }}>
          <DatingSuggestion loading />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll style={styles.container}>
      <FancyHeader
        headerTextTitle="Discover"
        headerTextFaded={`@${universityShortName(university)}`}
        active={activeTab}
        tabs={tabs}
        // type={1}
        setTab={(i) => handleChangeTab(i)}
      />
      <View style={styles.section_container}>
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: RFValue(16),
              marginHorizontal: 10,
              marginBottom: 10,
              backgroundColor: colors.dark_opacity_2,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              borderColor: colors.secondary_2,
              borderWidth: 0,
              overflow: "hidden",
              color: colors.secondary,
            }}
          >
            Suggested Peers
          </Text>
          <View style={styles.header}>
            <Text style={{ fontWeight: "700" }}>
              ~{" "}
              {yearOfStudy === "postgraduates"
                ? "Postgraduate"
                : yearOfStudy + " year students"}{" "}
            </Text>
            <View style={styles.adLabel}>
              <Text style={{ fontSize: 14 }}> Based on your stream </Text>
            </View>
          </View>
        </View>
        <AccountsSlider data={discoveryPage.related} />
      </View>
      <View style={{ padding: 10 }}>
        <DatingSuggestion />
      </View>
      <View
        style={[
          styles.section_container,
          {
            marginBottom: 100,
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={{ fontWeight: "700" }}>~ New friends </Text>
          <View style={styles.adLabel}>
            <Text style={{ fontSize: 14 }}> - at the {university}</Text>
          </View>
        </View>
        <View>
          <AccountsGrid data={discoveryPage.theRest} />
        </View>
      </View>
    </Screen>
  );
}

const DatingSuggestion = ({ loading }) => {
  const navigation = useNavigation();

  if (loading) {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: colors.dark_2,
          borderRadius: 10,
          borderWidth: 0,
          // borderColor: colors.secondary_2,
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <Text style={{ color: colors.dark_2, fontWeight: "600" }}>-</Text>
        <Text
          style={{
            fontSize: 30,
            //   fontWeight: "700",
            marginTop: 10,
            textAlign: "center",
            color: colors.dark_2,
            fontFamily: "Lobster-Regular",
          }}
        >
          Meet local encounters and friends at{" "}
        </Text>
        <View style={{ marginTop: 10 }}>
          <Button
            type={5}
            style={{
              borderColor: colors.dark,
              borderWidth: 2,
              borderRadius: 100,
            }}
            textStyle={{
              color: colors.dark,
            }}
            title="Loading"
          />
        </View>
      </View>
    );
  }
  return (
    <ImageBackground
      //   source={require("../assets/signup-img-1.jpg")}
      source={{
        uri: "https://www.stockvault.net/data/2021/01/30/282748/preview16.jpg",
      }}
      resizeMode="cover"
      imageStyle={{
        borderRadius: 10,
      }}
      style={{
        padding: 20,
        backgroundColor: colors.dark_opacity_2,
        borderRadius: 10,
        borderWidth: 0,
        // borderColor: colors.secondary_2,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 30,
      }}
    >
      <Text style={{ color: colors.white, fontWeight: "600" }}>
        Interested in something more fun ?
      </Text>
      <Text
        style={{
          fontSize: 30,
          //   fontWeight: "700",
          marginTop: 10,
          textAlign: "center",
          color: colors.lighish2,
          fontFamily: "Lobster-Regular",
        }}
      >
        Meet local encounters and friends at{" "}
        {universityShortName(store.getState().core.accData.university)}
      </Text>
      <View style={{ marginTop: 10 }}>
        <Button
          onPress={() => {
            navigation.navigate(DATING_NAVIGATOR);
          }}
          type={5}
          style={{
            borderColor: colors.primary,
            borderWidth: 2,
            borderRadius: 100,
          }}
          textStyle={{
            color: colors.secondary,
          }}
          title="Switch to dating"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  adLabel: {
    backgroundColor: colors.redish,
    padding: 3,
    borderRadius: 5,
    display: "flex",
  },
  section_container: {
    backgroundColor: colors.darkish,
    paddingVertical: 10,
  },
  header: {
    paddingHorizontal: 10,
    // fontSize: RFValue(16),
    fontWeight: "700",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
