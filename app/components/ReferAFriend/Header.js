import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import HeaderComponent from "../headers/header3";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Button from "../Button";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

function Header({ account }) {
  const navigation = useNavigation();

  console.log({ account });

  return (
    <>
      <HeaderComponent
        backPress={() => navigation.goBack()}
        backBtnText="back to profile"
        showAccount
        backIcon
      />
      <View style={styles.container}>
        <View style={styles.section_one}>
          <Text style={styles.heading}>Refer a friend</Text>
          <TouchableOpacity style={styles.button}>
            <Text>Your code</Text>
            <Text style={styles.code}>
              COMINGSOON!
              {/* {account.referral_code} */}
            </Text>
            <Text style={{ color: colors.secondary }}>
              Link copied to clipboard!
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
              <Text style={styles.text_center}>0</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* <Button type={3} title="See who used my link" /> */}
        </View>
      </View>
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
    backgroundColor: colors.darkish3,
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
