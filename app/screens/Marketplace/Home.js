import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import HomeHeader from "../../components/Marketplace/HomeHeader";
import CategoryMenu from "../../components/Marketplace/CategoryMenu";
import PageInviter from "../../components/PageInviter";
import TopJobs from "../../components/Marketplace/TopJobs";
import Loading from "../../components/Loaders/HomeUploading";
import { connect } from "react-redux";
import { get_home } from "../../store/actions/marketplaceActions";
import ListingSection from "../../components/Marketplace/ListingSection";
import { useFocusEffect } from "@react-navigation/native";

const mapStateToProps = (state) => {
  return {
    loading: state.marketplaceReducer.home.loading,
    data: state.marketplaceReducer.home.data,
    university: state.core.accData.university,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_home: () => dispatch(get_home()),
  };
};

function Home({ loading, get_home, data, university }) {
  useFocusEffect(
    React.useCallback(() => {
      get_home();
    }, []),
  );

  if (loading) {
    return (
      <View style={[styles.container]}>
        <HomeHeader />
        <CategoryMenu skeleton />
        <View style={styles.center}>
          <Loading />
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={[styles.container]}>
      <HomeHeader />
      <CategoryMenu />
      <ListingSection
        t1="Recent services"
        t2={`Browse services offered by students or people at the ${university}`}
        name="Services"
        data={data.market_items}
      />
      {/* <AdSpace /> */}
      <PageInviter page="marketplace-home" />
      <ListingSection
        t1="Recent listings"
        t2="See what's on sale by browsing ads or classifieds posted by people around you"
        name="Listings"
        data={data.listings}
      />
      <TopJobs data={data.joblistings} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
