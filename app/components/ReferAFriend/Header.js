import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import HeaderComponent from "../headers/header3";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Button from "../Button";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../Loaders/HomeUploading";
import * as Clipboard from "expo-clipboard";
import { PROFILE } from "../../navigation/routes";
import RefRewardsBox from "./RefRewardsBox";
import Input from "../Input";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function Header({ account }) {
  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const [loading, setLoading] = useState(true);
  const [refData, setRefData] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    axios
      .get("/u/getrefferalinfo")
      .then((data) => {
        setRefData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCopyLink = () => {
    Clipboard.setString(`https://varsityhq.co.za/r/${refData.referral_code}`);
    setLinkCopied(true);
  };

  return (
    <>
      <HeaderComponent
        backPress={() => {
          prevRoute?.name
            ? navigation.goBack()
            : navigation.navigate("AppNavigator");
        }}
        backBtnText="back to profile"
        showAccount
        backIcon
      />
      {loading ? (
        <View
          style={[
            styles.container,
            {
              flexDirection: "row",
              justifyContent: "center",
              top: 30,
            },
          ]}
        >
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.section_one}>
            <View style={styles.balance_section}>
              <Text style={styles.heading}>Your balance</Text>
              <Text>
                <Text style={styles.currency}>R</Text>{" "}
                <Text style={styles.balance_count}>{refData.credits}</Text>
              </Text>
              <Text style={styles.r_t}>
                You can request payout of minimum R{refData.minimum_payout} to
                cash.
              </Text>
            </View>
            <View>
              <Text style={styles.text_center}>
                You can enter a refer code below
              </Text>
              <View style={styles.ref_box}>
                <Input
                  type={1}
                  width="70%"
                  style={styles.en_c}
                  placeholder="Enter a refer code here to earn"
                />
                <Button title={"Enter"} style={styles.en_btn} type={3} />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleCopyLink}
              style={[
                styles.button,
                {
                  backgroundColor: linkCopied ? "#ffd70012" : colors.darkish,
                },
              ]}
            >
              <Text>Your code</Text>
              <Text style={styles.code}>
                {refData.referral_code}
                {/* {account.referral_code} */}
              </Text>
              <Text style={{ color: colors.secondary }}>
                {linkCopied
                  ? "Link copied to clipboard !"
                  : "Click to copy link to clipboard"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.text_center}>
              Invite a new person to download and use VarsityHQ. After their
              first post your both earn R{refData.cost_per_ref} each
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <View style={styles.row}>
              <RefRewardsBox per_ref={refData.cost_per_ref} num={5} />
              <RefRewardsBox per_ref={refData.cost_per_ref} num={10} />
              <RefRewardsBox per_ref={refData.cost_per_ref} num={20} />
            </View>
            <Text style={[styles.text_center, { fontWeight: "700" }]}>
              Refer Stats
            </Text>
            <View style={styles.bordered_view}>
              <View
                style={{
                  width: "70%",
                  borderRightColor: colors.white,
                  borderRightWidth: 1,
                  padding: 10,
                }}
              >
                <Text style={styles.text_center}>Total Refers</Text>
              </View>
              <View style={{ width: "30%", padding: 10 }}>
                <Text style={styles.text_center}>
                  {refData.referral_code_ucount}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* <Button type={3} title="See who used my link" /> */}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  balance_section: {
    width: "100%",
    // borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.darkish3,
    padding: 10,
    marginBottom: 20,
    paddingVertical: 20,
    flexDirection: "column",
    alignItems: "center",
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
  r_t: {
    color: colors.secondary,
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  en_c: {
    flex: 1,
    borderRadius: 5,
  },
  en_btn: {
    marginLeft: 10,
  },
  ref_box: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  ref_image: {
    height: 150,
  },
  bordered_view: {
    borderWidth: 1,
    borderColor: colors.white,
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  bold_text: {
    fontWeight: "700",
  },
  text_center: {
    alignSelf: "center",
    // width: "90%",
    textAlign: "center",
  },
  code: {
    fontWeight: "700",
    marginVertical: 5,
    fontSize: RFValue(20),
    color: "#FFD700",
  },
  button: {
    width: "100%",
    borderColor: "#FFD700",
    borderWidth: 1,
    borderRadius: 5,

    padding: 10,
    marginVertical: 20,
    paddingVertical: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: RFValue(16),
    marginBottom: 10,
    fontWeight: "700",
  },
  section_one: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    padding: 10,
  },
});

export default connect(mapStateToProps, null)(Header);
