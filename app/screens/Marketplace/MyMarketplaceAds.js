import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AppButton from "../../components/Button";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MARKETPLACE_CREATE, MARKETPLACE_HOME } from "../../navigation/routes";
import MyMarketplaceAd from "../../components/Marketplace/MyMarketplaceAd";
import CreatingEditingAdState from "../../components/Marketplace/CreateService/CreatingEditingAdState";
import { useNavigation } from "@react-navigation/native";
import db from "../../util/fb_admin";
import Loading from "../../components/Loaders/HomeUploading";
import { collection, orderBy, query, where } from "firebase/firestore";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userID: state.core.accData.userID,
  };
};

function MyMarketplaceAds({ userID }) {
  const [ads, setAds] = useState(["1"]);
  const navigation = useNavigation();

  const collectionRef = collection(db, "market_items");
  const ad_query = query(
    collectionRef,
    where("posted_by", "==", userID),
    orderBy("created_at", "desc"),
  );

  const [data, loading, error] = useCollectionData(ad_query);

  console.log({ data });

  return (
    <Screen scroll>
      <Header
        backPress={() => navigation.navigate(MARKETPLACE_HOME)}
        backIcon
        noBorder
        rightPress={() => navigation.navigate(MARKETPLACE_CREATE)}
        buttonText="Create"
      />
      <View style={styles.container}>
        <Text style={styles.heading}>My Ads</Text>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <CreatingEditingAdState />
          {loading ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Loading />
                <Text style={{ color: colors.secondary }}>Loading..</Text>
              </View>
            </View>
          ) : (
            <View>
              {data.map((x) => (
                <MyMarketplaceAd data={x} key={x.id} />
              ))}
            </View>
          )}
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

export default connect(mapStateToProps, null)(MyMarketplaceAds);
