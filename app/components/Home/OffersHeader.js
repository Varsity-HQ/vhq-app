import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";

function OffersHeader({ show = true }) {
  if (!show) return null;
  return (
    <>
      <View style={styles.upper_container}>
        <LinearGradient
          colors={[colors.primary, "#1c83f9"]}
          style={styles.grad_diverder}
          start={[0, 1]}
          end={[0.2, 0]}
        />
        <View
          style={{
            padding: 20,
          }}
        >
          <View style={styles.heading_container}>
            <View>
              <Text style={styles.header}>Offers</Text>
            </View>
            <View>
              <Button
                type={8}
                style={{
                  borderRadius: 100,
                }}
                title="My wallet"
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}
          >
            <Text>
              Claim these latest offers by reffering friends to VarsityHQ and
              get credits
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.lower_container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  grad_diverder: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  heading_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    // paddingRight: 0,
    fontSize: RFValue(35),
    fontFamily: "Lobster-Regular",
  },
  lower_container: {
    padding: 20,
    backgroundColor: colors.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: -13,
  },
});

export default OffersHeader;
