import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import HeaderComponent from "../components/headers/header3";
import Screen from "../components/Screen";
import Text from "../components/AppText";
import Button from "../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../config/colors";
import OfferCard from "../components/Post/OfferCard";
import AppTransaction from "../components/Profile/AppTransaction";
import Loading from "../components/Loaders/HomeUploading";
import axios from "axios";

function QcoinsOffersPage({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/get/coins-offers")
      .then((data) => {
        setData(data.data);
        setLoading(false);

        //   this.setState({
        //     data: data.data,
        //     loading: false,
        //   });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Screen scroll={!loading} style={styles.container}>
      <HeaderComponent
        backPress={() => navigation.goBack()}
        backBtnText="back to profile"
        showAccount
        backIcon
      />

      {loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            top: 50,
            flex: 1,
          }}
        >
          <Loading />
        </View>
      ) : (
        <>
          <View style={styles.inner_container}>
            <View style={styles.section_one}>
              <View>
                <Text style={styles.heading}>Current Credit</Text>
              </View>
              <View style={styles.balance_section}>
                <Text>
                  <Text style={styles.currency}>R</Text>{" "}
                  <Text style={styles.balance_count}>
                    {data.current_credits}
                  </Text>
                </Text>
              </View>
              <Text style={styles.text_center}>
                Your credit can be used to get offers, claim rewards or to
                advertise on VarsityHQ.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <Button type={8} disabled title="Buy Credits by Card" />
              </View>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View
              style={{
                borderBottomColor: colors.secondary_2,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <Text style={styles.sub_header}>Available Offers</Text>
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <ScrollView horizontal>
                {data.offers.map((x, index) => (
                  <OfferCard
                    useWindowWidth
                    key={index}
                    data={x}
                    navigation={navigation}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={styles.inner_container}>
            <View
              style={{
                borderBottomColor: colors.secondary_2,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <Text style={styles.sub_header}>Recent Transactions</Text>
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              {data.transactions.map((x, index) => (
                <AppTransaction data={x} key={index} />
              ))}
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  text_center: {
    alignSelf: "center",
    textAlign: "center",
  },
  balance_section: {
    width: "100%",
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.darkish3,
    padding: 10,
    marginVertical: 20,
    paddingVertical: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  section_one: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
  currency: {
    fontWeight: "700",
    fontSize: RFValue(25),
    color: colors.secondary,
  },
  balance_count: {
    fontWeight: "700",
    fontSize: RFValue(25),
  },
  sub_header: {
    fontSize: RFValue(14),
    fontWeight: "700",
  },
  heading: {
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  inner_container: {
    padding: 10,
  },
  container: {
    paddingBottom: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
});

export default QcoinsOffersPage;
