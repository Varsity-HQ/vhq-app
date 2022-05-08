import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import universityShortName from "../../util/universityShortName";
import { normalizeText } from "../../util/responsivePx";
import { RFValue } from "react-native-responsive-fontsize";
import Input from "../Input";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    university: state.core.accData.university,
  };
};

const height = Dimensions.get("window").height;

function CommonHeader({ profilepic, university }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: "30%" }}>
          <TouchableWithoutFeedback>
            <Image style={styles.profilepic} uri={profilepic} />
          </TouchableWithoutFeedback>
        </View>
        <Text
          // numberOfLines={1}
          // adjustsFontSizeToFit
          allowFontScaling={false}
          style={styles.vhq_title}
        >
          VarsityHQ
        </Text>
        <View style={styles.header_uni_container}>
          <View style={styles.header_uni_wrapper}>
            <FontAwesome
              name="university"
              color={colors.secondary}
              // style={{ marginRight: 10 }}
              size={20}
            />

            <Text style={styles.header_uni_text}>
              {universityShortName(university)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Input
          style={styles.searchbox}
          type={2}
          placeholder="Search marketplace.."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    borderTopColor: colors.secondary_2,
    borderBottomColor: colors.secondary_2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.dark_opacity_2,
  },
  container: {},
  header_uni_wrapper: {
    borderWidth: 2,
    borderColor: colors.secondary_2,
    borderRadius: 50,
    padding: normalizeText(8),
    marginRight: 10,
    paddingLeft: 15,
    // paddingHorizontal: normalizeText(18),
    // paddingVertical: normalizeText(8),
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  header_uni_text: {
    marginLeft: 7,
    marginRight: 7,
    color: colors.secondary,
    fontWeight: "700",
    alignSelf: "center",
    fontSize: RFValue(14),
  },
  header_uni_container: {
    width: "30%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    // height: 10,
  },
  vhq_title: {
    fontSize: RFValue(30),
    fontWeight: "800",
    color: colors.white,
    fontFamily: "Lobster-Regular",
    width: "40%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: normalizeText(18),
    overflow: "hidden",
  },
  profilepic: {
    height: height * 0.06,
    width: height * 0.06,
    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.dark_opacity_2,
  },
});

export default connect(mapStateToProps, null)(CommonHeader);
