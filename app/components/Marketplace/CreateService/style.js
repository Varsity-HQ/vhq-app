import { StyleSheet } from "react-native";
import colors from "../../../config/colors";
import { normalizeText } from "../../../util/responsivePx";

const styles = StyleSheet.create({
  input_sub: {
    color: colors.secondary,
    fontSize: normalizeText(13),
    marginTop: 5,
  },
  dropdown: {
    marginTop: 10,
  },
  input: {
    marginTop: 15,
  },
  event_title: {
    fontWeight: "700",
    fontSize: normalizeText(20),
    marginBottom: 10,
  },
  ped_from_text: {
    marginLeft: 5,
  },
  det_section: {
    marginBottom: 10,
  },
  row_between: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  smallText: {
    fontSize: normalizeText(13),
    color: colors.secondary,
  },
  event_container: {
    padding: 10,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 7,
  },
  border: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lighish,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginbottom20: {
    marginBottom: 20,
  },
  switcher: {
    marginRight: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  et_container: {
    marginTop: 10,
  },
  exp_container: {
    borderBottomColor: colors.lighish,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  text_exp: {
    color: colors.secondary,
    marginTop: 5,
  },
  input_container: {
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
  },
  input_title: {
    fontWeight: "700",
    textTransform: "capitalize",
  },
  tab_container: {
    marginTop: 20,
  },
  u_det_container: {
    marginTop: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingBottom: 15,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
  },
  container: {
    flex: 1,
  },
});

export default styles;
