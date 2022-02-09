import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";

const styles = StyleSheet.create({
  buttonBorders: {
    borderColor: colors.lighish2,
    height: 45,
    borderRadius: 100,
  },
  circle_btn: {
    borderWidth: 1,
    borderColor: colors.lighish2,
    // padding: 12,
    borderRadius: 100,
    marginLeft: 10,
    height: 45,
    width: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkish3,
  },
  prof_inf: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  buttonShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  user_f_name: {
    fontSize: normalizeText(20),
    marginBottom: 5,
    color: colors.white,
    marginTop: 5,
    fontWeight: "700",
  },
  anon_state: {
    fontSize: 15,
    color: colors.secondary,
    fontWeight: "500",
  },

  user_stream: {
    color: colors.lighish2,
    fontWeight: "500",
    fontSize: RFValue(13),
    paddingVertical: 2,
  },
  username: {
    color: colors.secondary,
    fontWeight: "500",
    marginBottom: 5,
    fontSize: RFValue(13),
    // fontSize: 40,
  },
  profilepic: {
    height: 125,
    width: 125,
    borderRadius: 100,
    backgroundColor: colors.darkish,
  },
  toggle_anonymous_text: {
    color: colors.white,
    fontWeight: "700",
  },

  toggle_anonymous: {
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  header_username: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
  container: {},
  header: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default styles;
