import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CommonHeader from "../../components/Marketplace/CommonHeader";
import ItemGallery from "../../components/Marketplace/ItemGallery";
import ItemHeader from "../../components/Marketplace/ItemHeader";
import Screen from "../../components/Screen";
import ItemSlider from "../../components/Marketplace/ItemSlider";
import ItemActions from "../../components/Marketplace/ItemActions";
import ItemAbout from "../../components/Marketplace/ItemAbout";
import { useRoute } from "@react-navigation/native";
import Loading from "../../components/Loaders/HomeUploading";
import { color } from "react-native-reanimated";
import colors from "../../config/colors";
import Text from "../../components/AppText";
import axios from "axios";
import ItemPageHeader from "../../components/Marketplace/ItemPageHeader.js";
import ItemSellerInfo from "../../components/Marketplace/ItemSellerInfo";
import ItemAddListing from "../../components/Marketplace/ItemAddListing";
import CommunityProtection from "../../components/Marketplace/CommunityProtection";
//
function ItemPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const itemID = useRoute().params.id;

  useEffect(() => {
    axios
      .get(`/marketplace/${itemID}`)
      .then((data) => {
        let item = data.data;
        setData(item);
        setLoading(false);
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <ScrollView
        scroll
        style={[styles.container]}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Loading />
          <Text
            style={{
              color: colors.secondary_2,
            }}
          >
            Just a sec...
          </Text>
        </View>
      </ScrollView>
    );
  }

  // console.log({ data });

  return (
    <ScrollView scroll style={styles.container}>
      <ItemGallery images={data.attachments} />
      <ItemHeader data={data} />
      <ItemActions data={data.user_data} />
      <ItemSellerInfo data={data.user_data} />
      <ItemAbout />
      <CommunityProtection data={data} />
      <ItemAddListing />
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <ItemSlider data={data.related} />
      </View>
    </ScrollView>
  );
} //
const styles = StyleSheet.create({
  container: {},
});

export default ItemPage;
