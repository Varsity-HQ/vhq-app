import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { connect } from "react-redux";
import db from "../util/fb_admin";

const mapStateToProps = (state) => {
  return {
    userID: state.core.accData.userID,
  };
};

function QcoinsOffersPage({ navigation, userID }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [payout_status, set_payout] = useState(false);
  const [minimum_payout, set_minimum_payout] = useState(5000);

  useEffect(() => {
    get_coins_n_ref_data();
  }, []);

  const get_coins_n_ref_data = async () => {
    try {
      let docRef = doc(db, "accounts", userID);
      let confDocRef = doc(db, "configurations", "referrals");
      let docdata = await getDoc(docRef);
      let config_data = await getDoc(confDocRef);
      let coins_n_data = await axios.get("/get/coins-offers");
      let was_payout_requested = docdata.data().payout_requested;
      let minimum_payout_set = parseFloat(config_data.data().minimum_payout);

      set_payout(was_payout_requested);
      set_minimum_payout(minimum_payout_set);
      setData(coins_n_data.data);
      setLoading(false);
    } catch (error) {}
  };

  const handle_request_po_f = async () => {
    try {
      let docRef = doc(db, "accounts", userID);
      await updateDoc(docRef, {
        payout_requested: true,
      });
      set_payout(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handle_request_payout = () => {
    let current_credit = parseFloat(data.current_credits);

    if (current_credit < minimum_payout) {
      return Alert.alert(
        "Payout denied",
        `Unfortunately you can't make a request as yet. Mininum request credit should be R${minimum_payout}`,
      );
    }

    Alert.alert(
      "Before we continue",
      "Requesting payout will have our support team contact you asking for your details so that we can you send your accumulated funds. Do you wish to continue ?",
      [
        {
          text: "Yes request",
          onPress: () => handle_request_po_f(),
        },
        {
          text: "No, not yet",
        },
      ],
    );
    // set_payout(true);
  };

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
                <Text style={styles.r_t}>
                  You can request payout of minimum R{minimum_payout} to cash.
                </Text>
              </View>
              <Text style={styles.text_center}>
                Press the button below and our support will message you via the
                VarsityHQ chat with details.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <Button
                  onPress={handle_request_payout}
                  type={8}
                  disabled={payout_status}
                  title={
                    payout_status ? "Awaiting  for payout" : "Request payout"
                  }
                />
              </View>
              {payout_status ? (
                <Text style={styles.r_t}>
                  Expect a message in "Chat" from our support in relation to
                  your payout request.
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={[
              styles.inner_container,
              {
                display: "none",
              },
            ]}
          >
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
  r_t: {
    color: colors.secondary,
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
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
    paddingVertical: 20,
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
  },
});

export default connect(mapStateToProps, null)(QcoinsOffersPage);
