import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
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
    marginTop: 0,
  },
  input_container: {
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
  },
  input_title: {
    fontWeight: "700",
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
