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

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function Header({ account }) {
  const navigation = useNavigation();
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
        console.log(err);
      });
  }, []);

  const handleCopyLink = () => {
    Clipboard.setString(
      `https://varsityhq.co.za?referralCode=${refData.referral_code}`,
    );

    setLinkCopied(true);
  };

  return (
    <>
      <HeaderComponent
        backPress={() => navigation.goBack()}
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
            <Text style={styles.heading}>Refer a friend</Text>
            <TouchableOpacity
              onPress={handleCopyLink}
              style={[
                styles.button,
                {
                  backgroundColor: linkCopied
                    ? colors.darkish3
                    : colors.darkish,
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
              Share your code or referral link to a friend and earn 3 VarsityHQ
              coins when they use it to join VarsityHQ and post for the first
              time.
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
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
  },
  button: {
    width: "100%",
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,

    padding: 10,
    marginVertical: 20,
    paddingVertical: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: RFValue(18),
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
  container: {
    padding: 10,
  },
});

export default connect(mapStateToProps, null)(Header);
