import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import HomeHeader from "../../components/Marketplace/HomeHeader";
import CategoryMenu from "../../components/Marketplace/CategoryMenu";
import TopServices from "../../components/Marketplace/TopServices";
import PageInviter from "../../components/PageInviter";
import TopJobs from "../../components/Marketplace/TopJobs";

function Home(props) {
  return (
    <ScrollView style={[styles.container]}>
      <HomeHeader />
      <CategoryMenu />
      <TopServices />
      {/* <AdSpace /> */}
      <PageInviter page="marketplace-home" />
      <TopServices />
      <TopJobs />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
