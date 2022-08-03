import { StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.dark_2,
    padding: 12,
    paddingBottom: 0,
    marginBottom: 5,
    borderRadius: 25,
    // width: "100%",
  },
  comment_line: {
    // width: 2,
    // height: "100%",
    // backgroundColor: "white",
    // alignSelf: "center",
    // flex: 1,
  },
  responses_text: {
    fontWeight: "700",
    color: colors.secondary,
  },
  date_posted: {
    fontSize: 14,
    color: colors.secondary,
  },
  u_name: {
    fontSize: 15,
    fontWeight: "700",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: colors.darkish3,
    // flex : 1
  },

  container: {
    paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: colors.dark_2,
  },
});

export default styles;
