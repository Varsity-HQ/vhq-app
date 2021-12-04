import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const vhqTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.dark,
    text: colors.white,
  },
};

export default vhqTheme;
