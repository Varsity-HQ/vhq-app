import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

function AppButton({
  title,
  loading,
  disabled,
  style,
  textStyle,
  navigateRoute,
  onPress,
  type = 1,
  content,
  ...props
}) {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (disabled) return;
    if (navigateRoute) {
      onPress();
      navigation.navigate(navigateRoute[0], navigateRoute[1]);
    } else {
      if (!loading) onPress && onPress();
    }
  };

  if (type === 8) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_8, style]}
        onPress={handleOnPress}
      >
        <Text style={[styles.text_t8, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 7) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_7, style]}
        onPress={handleOnPress}
      >
        <Text style={[styles.text_t7, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 6) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_t6, style]}
        onPress={handleOnPress}
      >
        {content ? (
          content
        ) : (
          <Text style={[styles.text_t3, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
  if (type === 5) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_t5, style]}
        onPress={handleOnPress}
      >
        <Text style={[styles.text_t3, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 4) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_t4, style]}
        onPress={handleOnPress}
      >
        {content ? (
          content
        ) : (
          <Text style={[styles.text_t3, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  if (type === 3) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_t3, style]}
        onPress={handleOnPress}
      >
        {content ? (
          content
        ) : (
          <Text style={[styles.text_t3, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
  if (type === 2) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button_t2, style]}
        onPress={handleOnPress}
      >
        <Text style={[styles.text_t2, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 1) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button, style]}
        onPress={handleOnPress}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  button_8: {
    position: "relative",
    backgroundColor: colors.dark,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_7: {
    position: "relative",
    backgroundColor: colors.dark,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t6: {
    position: "relative",
    backgroundColor: colors.dark,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t5: {
    position: "relative",
    backgroundColor: colors.dark,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t4: {
    position: "relative",
    backgroundColor: colors.primary,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t3: {
    position: "relative",
    backgroundColor: colors.darkish3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t2: {
    position: "relative",
    backgroundColor: colors.white,
    borderColor: colors.dark_opacity_2,
    borderWidth: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  button: {
    position: "relative",
    backgroundColor: colors.primary,
    borderColor: "#1481b8",
    borderWidth: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text_t8: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "600",
  },
  text_t7: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  text_t3: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  text_t2: {
    color: colors.primary,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
