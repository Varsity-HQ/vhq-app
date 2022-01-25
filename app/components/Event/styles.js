import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
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
