import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import * as WebBrowser from "expo-web-browser";

const REWARDS_TS_AND_CS_LINK =
  "https://varsityhq.co.za/vhq-reward-scheme-terms-and-conditions";

function ReferralRewardsTnCsButton() {
  const handleOpenWebPage = async () => {
    try {
      await WebBrowser.openBrowserAsync(REWARDS_TS_AND_CS_LINK);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => handleOpenWebPage()}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.dark_opacity_2,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: colors.secondary,
          fontSize: 14,
        }}
      >
        By participating in referral reward activities, you agree to our
        <Text
          style={{
            fontWeight: "700",
            marginLeft: 5,
            fontSize: 14,
          }}
        >
          {" "}
          Terms and conditions &#x2192;
        </Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ReferralRewardsTnCsButton;
