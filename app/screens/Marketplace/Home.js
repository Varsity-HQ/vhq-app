import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import HomeHeader from "../../components/Marketplace/HomeHeader";
import CategoryMenu from "../../components/Marketplace/CategoryMenu";
import TopServices from "../../components/Marketplace/TopServices";
import AdSpace from "../../components/AdComponents/FullWidth";
import TopJobs from "../../components/Marketplace/TopJobs";

function Home(props) {
  return (
    <Screen scroll style={styles.container}>
      <HomeHeader />
      <CategoryMenu />
      <TopServices />
      {/* <AdSpace /> */}
      <TopServices />
      <TopJobs />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
