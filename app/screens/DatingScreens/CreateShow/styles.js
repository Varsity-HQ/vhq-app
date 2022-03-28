import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../../config/colors";

const styles = StyleSheet.create({
  bottomBtn: {
    borderWidth: 0,
    backgroundColor: colors.darkish3,
    // borderColor
  },
  input: {
    textAlign: "center",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  header: {
    fontSize: RFValue(24),
    fontWeight: "700",
    marginBottom: 10,
  },
  header2: {
    fontSize: RFValue(18),
    fontWeight: "700",
    marginBottom: 10,
  },
  subText: {
    fontSize: RFValue(14),
    color: colors.secondary,
  },
  text_center: {
    textAlign: "center",
  },
  bottomButtonContainer: {
    marginTop: 10,
  },
  form_container: {
    marginVertical: 50,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 30,
  },
});

export default styles;
