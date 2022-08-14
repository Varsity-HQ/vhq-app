import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AppButton from "../../components/Button";
import { MARKETPLACE_CREATE, MARKETPLACE_HOME } from "../../navigation/routes";
import MyMarketplaceAd from "../../components/Marketplace/MyMarketplaceAd";
import { useNavigation } from "@react-navigation/native";

function MyMarketplaceAds() {
  const [ads, setAds] = useState(["1"]);
  const navigation = useNavigation();
  return (
    <Screen>
      <Header
        backPress={() => navigation.navigate(MARKETPLACE_HOME)}
        backIcon
        noBorder
        buttonText="Create"
      />
      <View style={styles.container}>
        <Text style={styles.heading}>My Ads</Text>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <MyMarketplaceAd />
          <MyMarketplaceAd />
          <MyMarketplaceAd />
        </View>
        {ads.length === 0 && <NoAds navigation={navigation} />}
      </View>
    </Screen>
  );
}

const NoAds = ({ navigation }) => {
  return (
    <View
      style={{
        marginVertical: 60,
        paddingHorizontal: 20,
      }}
    >
      <MaterialCommunityIcons
        name="emoticon-neutral-outline"
        size={70}
        style={{ alignSelf: "center", marginBottom: 10 }}
        color={colors.white}
      />
      <Text
        style={[
          styles.header_text,
          {
            fontSize: 20,
          },
        ]}
      >
        You dont have any ads
      </Text>
      <Text
        style={[
          styles.header_text,
          {
            fontSize: 16,
            fontWeight: "500",
            marginTop: 10,
            color: colors.secondary,
          },
        ]}
      >
        Create an ad and start advertising your services or listings and more..
      </Text>
      <AppButton
        onPress={() => navigation.navigate(MARKETPLACE_CREATE)}
        style={{ marginTop: 30 }}
        title="Create Ad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontWeight: "700",
    fontSize: 30,
    textAlign: "center",
  },
  container: {
    padding: 10,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

export default MyMarketplaceAds;
