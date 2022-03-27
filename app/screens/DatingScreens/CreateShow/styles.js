import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  bottomBtn: {
    borderWidth: 0,
  },
  input: {
    textAlign: "center",
  },
  header: {
    fontSize: RFValue(24),
    fontWeight: "700",
  },
  text_center: {
    textAlign: "center",
  },
  bottomButtonContainer: {
    marginTop: 10,
  },
  form_container: {
    marginVertical: 30,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default styles;
