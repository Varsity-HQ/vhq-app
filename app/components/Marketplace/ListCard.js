import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "../AppText";
import Image from "../Image";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { useNavigation } from "@react-navigation/native";
import { MARKETPLACE_ITEM_PAGE } from "../../navigation/routes";

const height = Dimensions.get("window").height;

function ListCard(props) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(MARKETPLACE_ITEM_PAGE);
      }}
    >
      <View style={styles.container}>
        <View>
          <Image style={styles.card_image} />
        </View>
        <View style={styles.content_section}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={styles.row}>
              <Text style={styles.cat_text1}>SERVICE</Text>
              <Text style={styles.cat_text}> - ANY</Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              Self fix Here at self fix we aim to help you help yourself hence
              the name “Self fix” all we do is assist/guide you through
            </Text>
          </View>
          <View style={styles.bottom_section}>
            <View>
              <View style={[styles.row]}>
                <View
                  style={[
                    styles.row,
                    { paddingHorizontal: 5, paddingVertical: 2 },
                  ]}
                >
                  <FontAwesome
                    name="eye"
                    style={{
                      marginRight: 3,
                    }}
                    size={20}
                    color={colors.primary}
                  />
                  <Text style={styles.bold}>1</Text>
                </View>
                <LinearGradient
                  style={styles.gradient}
                  colors={["#9e7b9b", "#1160af"]}
                  start={[1, 0]}
                  end={[0, 1]}
                />
              </View>
            </View>
            <View>
              <Text style={styles.bold}>Free</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "700",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cat_text1: {
    fontSize: RFValue(12),
    fontWeight: "700",
    color: colors.secondary,
  },
  cat_text: {
    fontSize: RFValue(12),
    fontWeight: "700",
  },
  content_section: {
    flex: 1,
    marginLeft: 10,
  },
  bottom_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: RFValue(14),
    marginTop: 7,
  },
  card_image: {
    height: height * 0.12,
    width: height * 0.12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  container: {
    borderTopColor: colors.lighish,
    borderTopWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
});

export default ListCard;
