import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { REFER_A_FRIEND } from "../../navigation/routes";

function index({ page = "" }) {
  const navigation = useNavigation();
  if (page === "marketplace-home") {
    return (
      <View style={styles.mh_container}>
        <View>
          <Text style={styles.heading}>Invite friends & Get rewards </Text>
        </View>
        <View>
          <Text style={styles.promo_text}>
            Introduce your friends to the best student community in South Africa
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
          }}
        >
          <Button
            type={3}
            onPress={() => navigation.navigate(REFER_A_FRIEND)}
            style={{
              backgroundColor: colors.transparent,
              paddingHorizontal: 0,
              paddingBottom: 0,
            }}
            content={
              <View style={styles.row}>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginBottom: 0,
                    },
                  ]}
                >
                  Invite Friends
                </Text>
                <FontAwesome
                  color={colors.white}
                  size={20}
                  style={{
                    marginLeft: 7,
                  }}
                  name="arrow-right"
                />
              </View>
            }
          />
        </View>
      </View>
    );
  }

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  mh_container: {
    padding: 20,
    margin: 10,
    backgroundColor: colors.v_st_bg_3,
    borderRadius: 10,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  heading: {
    fontSize: RFValue(16),
    fontWeight: "600",
    marginBottom: 10,
  },
  promo_text: {
    fontSize: RFValue(13),
  },
});

export default index;
