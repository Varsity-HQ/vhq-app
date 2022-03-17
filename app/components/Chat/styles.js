import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {},
  header_container: {},
  n_badge: {
    height: 14,
    width: 14,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    position: "absolute",
    top: -5,
    left: 0,
  },
  grad_diverder: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },

  tab: {
    marginLeft: 10,
    height: "100%",
  },
  tabbar_container: {
    borderTopWidth: 3,
    borderRadius: 0,
    borderTopColor: colors.primary,
    backgroundColor: colors.dark,
  },
  profilepic: {
    height: height * 0.07,
    width: height * 0.07,

    marginLeft: 15,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.dark_opacity_2,
  },
  header_uni_text: {
    marginLeft: 7,
    marginRight: 7,
    color: colors.secondary,
    fontWeight: "700",
    alignSelf: "center",
    fontSize: RFValue(14),
  },
  header_uni_wrapper: {
    // borderWidth: 2,
    // borderColor: colors.secondary_2,
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
  // header_uni_wrapper: {
  //   borderWidth: 2,
  //   borderColor: colors.secondary,
  //   borderRadius: 50,
  //   borderRightWidth: 0,
  //   borderTopRightRadius: 0,
  //   borderBottomRightRadius: 0,
  //   paddingHorizontal: normalizeText(18),
  //   paddingVertical: normalizeText(8),
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  header_uni_container: {
    width: "30%",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    // height: 10,
  },
  vhq_title: {
    fontSize: RFValue(30),
    // fontSize: 38%,
    fontWeight: "800",
    color: colors.white,
    fontFamily: "Lobster-Regular",
    height: 39,
    // alignItems: "center",
    // flexDirection: "row",
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
  container: {},
  footer_container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  footer_text_container: {
    textAlign: "center",
  },
  s_c_button: {
    borderRadius: 100,
    borderColor: colors.secondary,
    borderWidth: 2,
    paddingVertical: 10,
  },
  t_center: {
    textAlign: "center",
  },
  subText: {
    color: colors.secondary,
    marginBottom: 20,
    fontSize: RFValue(14),
  },
  header3: {
    fontSize: RFValue(20),
    marginBottom: 10,
    fontWeight: "700",
  },
  chat_profile_pic: {
    height: height * 0.07,
    width: height * 0.07,
    borderRadius: 100,
    marginRight: 10,
  },
  c_s_left_section: {
    flexDirection: "row",
    alignItems: "center",
  },
  c_s_container: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  c_s_user_time: {
    marginVertical: 3,
    flexDirection: "row",
  },
  sk_c_s_user_time: {
    marginVertical: 8,
    flexDirection: "row",
    height: 18,
    width: "50%",
  },
  c_s_name: {
    fontWeight: "700",
  },
  sk_c_s_name: {
    height: 18,
    width: "80%",
  },
  c_s_msg_preview: {
    color: colors.secondary,
  },
  c_s_dot: {
    height: height * 0.013,
    width: height * 0.013,
    backgroundColor: colors.primary,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  c_s_dot_them: {
    height: height * 0.013,
    width: height * 0.013,
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  c_s_time_stamp: {
    backgroundColor: colors.darkish3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 7,
  },
  c_s_time_text: {
    fontSize: RFValue(12),
  },
  c_s_dot_sptor: {
    fontSize: RFValue(15),
    color: colors.secondary,
  },
});

export default styles;
